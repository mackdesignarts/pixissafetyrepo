using SafetyTraining.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SafetyTraining.Web.Controllers
{
    public class PrintController : Controller
    {

        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET: /Print/
        public ActionResult Index(string collection, string groupBy, string filter)
        {
            //var table = db[collection];
            //var q = from t in table;

            //    where t[filter] == filter
            return View();
        }
	}
}