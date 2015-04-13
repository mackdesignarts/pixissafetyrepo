using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using SafetyTraining.Data;

namespace SafetyTraining.Web.Controllers
{
    public class MedicalSearchController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // TODO: MedicalSearchResult table does not exist

        //// GET odata/MedicalSearch
        //[Queryable]
        //public IQueryable<MedicalSearchResult> GetMedicalSearch()
        //{
        //    var UserId = System.Web.HttpContext.Current.Session["user"].ToString();
        //    short days = 180;
        //    short.TryParse(Request.RequestUri.ParseQueryString().Get("Days"), out days);

        //    string dbId = Request.RequestUri.ParseQueryString().Get("DBID");
        //    string firstName = Request.RequestUri.ParseQueryString().Get("FirstName");
        //    string lastName = Request.RequestUri.ParseQueryString().Get("LastName");
        //    string medicalTest = Request.RequestUri.ParseQueryString().Get("MedicalTest");
        //    string exp = null; // Request.RequestUri.ParseQueryString().Get("Expired");
        //    string sort = Request.RequestUri.ParseQueryString().Get("Sort");
        //    string tlEmpl = Request.RequestUri.ParseQueryString().Get("TLEmployee");
        //    string locCode = Request.RequestUri.ParseQueryString().Get("LocationCode");

        //    var q =
        //        db.spselMedicalSearch(dbId, null, firstName, lastName, medicalTest, exp, days, "", sort, tlEmpl, locCode).ToList().AsQueryable();

        //    return q;


        //}

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        db.Dispose();
        //    }
        //    base.Dispose(disposing);
        //}

        //private bool CourseExists(int key)
        //{
        //    return db.Courses.Count(e => e.CourseID == key) > 0;
        //}
    }
}