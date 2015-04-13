using System;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;
using System.Web.Http.Controllers;
using System.Net;
using System.Net.Http;
using SafetyTraining.Data;
using System.Collections.Generic;

namespace SafetyTraining.Web.ActionFilters
{
    public class HasAttribute : ActionFilterAttribute
    {
        private string Flag;
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        public HasAttribute(string flag)
        {
            this.Flag = flag;
        }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var UserId = (int)System.Web.HttpContext.Current.Session["user"];
            var hasFlag = db.UserAccesses.Where(ua => ua.UserID == UserId && ua.UserAccessFlag.Flag == this.Flag);
            if (hasFlag.Count() == 0)
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.MethodNotAllowed);
            }
        }
    }
}