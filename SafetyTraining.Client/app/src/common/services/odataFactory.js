/**
 * Created by Tony Mack on 3/1/14.
 */

'use strict';

app.factory('odata', [function () {

    function oDataQueryString(options) {
        if (!options) return '';
        if (options.ipp) {
            options.top = options.ipp;
            options.skip = (((options.page || 1) - 1) * options.top);
        }

        var qs = {};
        if (options.skip)
            qs.$skip = options.skip;
        if(options.top)
            qs.$top = options.top;
        if (options.filter && !$.isEmptyObject(options.filter))
            qs.$filter = oDataFilterString(options.filter);
        if (options.expand) {
            if (_.isArray(options.expand))
                options.expand = options.expand.join(',');
            if(options.expand)
                qs.$expand = options.expand;
        }
        if (options.orderBy) {
            if (_.isArray(options.ordrBy))
                options.ordrBy = options.orderBy.join(',');
            qs.$orderby = options.orderBy;
            if (options.reverse)
                qs.$orderby += ' desc';
            else
                qs.$orderby += ' asc';
        }
        if (options.count)
            qs.$inlinecount = 'allpages';

        var queryArr = [];
        for (var key in qs) {
            if (qs[key] !== undefined && qs[key] !== null)
                queryArr.push(key + '=' + qs[key]);
        }
        var querystring = "?" + queryArr.join('&');
        return querystring;
    }

    var operators = {
        'and': function (value) {
            var tmpArr = [];
            _.forEach(value, function (val) {
                tmpArr.push(oDataFilterString(val));
            });
            return '(' + tmpArr.join(' and ') + ')';
        },
        'or': function (value) {
            var tmpArr = [];
            _.forEach(value, function (val) {
                tmpArr.push(oDataFilterString(val));
            });
            return '(' + tmpArr.join(' or ') + ')';
        },
        '!': function (value, key) {
            this.not(value, key);
        },
        ' ': function (value, key) {
            return key + " " + value;
        },
        'not': function (value, key) {
            if (!_.isArray(escapeValue(value)) && !_.isObject(escapeValue(value)))
                return key + ' ne ' + escapeValue(value);
            return 'not (' + oDataFilterString(value) + ')'
        },
        'like': function (value, key) {
            return this.contains(value, key);
        },
        '<': function (value, key) {
            return key + ' lt ' + escapeValue(value);
        },
        '>': function (value, key) {
            return key + ' gt ' + escapeValue(value);
        },
        '<=': function (value, key) {
            return key + ' le ' + escapeValue(value);
        },
        '>=': function (value, key) {
            return key + ' ge ' + escapeValue(value);
        },
        '=': function (value, key) {
            if (value !== '') {
                return key + ' eq ' + escapeValue(value);
            } else {
                return 'true eq true';
            }
        },
        'startsWith': function (value, key) {
            return 'startswith(' + key + ', ' + escapeValue(value) + ') eq true';
        },
        'endsWith': function (value, key) {
            return 'endswith(' + key + ', ' + escapeValue(value) + ') eq true';
        },
        'contains': function (value, key) {
            return 'substringof(' + escapeValue(value) + ', ' + key + ') eq true';
        },
        'field': function (v, k) {
            var tmpArr = [];
            if (_.isObject(v)) {
                tmpArr = [];
                _.forIn(v, function (value, key) {
                    tmpArr.push((operators[key] && operators[key](value,k)) || operators.field(value, key));
                });
                return operators.or(tmpArr);
            } else if (_.isArray(v)) {
                tmpArr = [];
                _.forEach(v, function (value) {
                    tmpArr.push(operators['='](value, k));
                });
                return operators.or(tmpArr);
            } else {
                return operators['='](v, k);
            }
        }
    };

    function escapeValue(value) {
        value = parseValue(value);
        if (_.isString(value))
            return "'" + value + "'";
        if (_.isDate(value))
            return "datetime'" + value.toISOString() + "'";
        return value;
    }

    function parseValue(value) {
        if (value === "false")
            return false;
        else if (value === "true")
            return true;
        else if (value === "null")
            return null;
        else if (value === null)
            return null;
        else if (value.toString().indexOf('!') != -1)
        {
            var val = value.substring(0, value.indexOf('!'));
            //if (!_.isNaN(value))
            //    return _.parseInt(value);
            //else return value;
            return val;
        }
        else if (/^-?([0-9]*(\.[0-9]+)?|Infinity)$/.test(value) && !_.isNaN(_.parseInt(value)))
            return _.parseInt(value);
        //else if (!_.isNaN(value))
        //    return value.toString();
        else if (!_.isNaN(Date.parse(value)))
            return new Date(value);
        else 
            return value;
    }

    function oDataFilterString(filter) {
        if (_.isObject(filter)) {
            var filterString = "";
            _.forIn(filter, function (value, key) {
                filterString += (operators[key] || operators.field)(value, key);
            });
            return filterString;
        } else if (_.isArray(filter)) {
            return operators.or(filter); // not sure if filter will ever be an array here...
        } else
            return filter;
    }

    return {
        queryString: function (data) {
            return oDataQueryString(data);
        }
    }
}]);
