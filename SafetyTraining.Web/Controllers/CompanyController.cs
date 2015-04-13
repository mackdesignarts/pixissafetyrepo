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
using SafetyTraining.Web.ActionFilters;
using System.Web.Http.OData;

namespace SafetyTraining.Web.Controllers
{
    public class CompanyController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET odata/Company
        public IQueryable<TLCompany> GetCompany()
        {
            var limited = Request.RequestUri.ParseQueryString().Get("limited");
            if (String.IsNullOrEmpty(limited))
            {
                return db.TLCompanies;
            }
            else
            {
                IEnumerable<string> headerValues = Request.Headers.GetValues("UserId");
                var UserId = int.Parse(headerValues.FirstOrDefault());
                return db.UserCompanies.Where(uc => uc.UserID == UserId).Select(uc => uc.TLCompany);
            }
        }
        public string Get(string key)
        {
            return key;
        }

        // GET odata/Company(5)
        public SingleResult<TLCompany> GetCompany(string key)
        {
            //if (key.Length > 5)
            //{
            //    return SingleResult.Create(db.TLCompanies.Where(dbo_ctl_ts__company_information => dbo_ctl_ts__company_information.Company_Name == key));
            //}
            return SingleResult.Create(db.TLCompanies.Where(dbo_ctl_ts__company_information => dbo_ctl_ts__company_information.DBID == key));
        }

        // PUT odata/Company(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Put(string key, TLCompany dbo_ctl_ts__company_information)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != dbo_ctl_ts__company_information.DBID)
            {
                return BadRequest();
            }

            db.Entry(dbo_ctl_ts__company_information).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!dbo_CTL_TS__COMPANY_INFORMATIONExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(dbo_ctl_ts__company_information);
        }

        // POST odata/Company
        [NotHas("ReadOnly")]
        public IHttpActionResult Post(TLCompany dbo_ctl_ts__company_information)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TLCompanies.Add(dbo_ctl_ts__company_information);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (dbo_CTL_TS__COMPANY_INFORMATIONExists(dbo_ctl_ts__company_information.DBID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Ok(dbo_ctl_ts__company_information);
        }

        // PATCH odata/Company(5)
        [AcceptVerbs("PATCH", "MERGE")]
        [NotHas("ReadOnly")]
        public IHttpActionResult Patch(string key, Delta<TLCompany> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            TLCompany dbo_ctl_ts__company_information = db.TLCompanies.Find(key);
            if (dbo_ctl_ts__company_information == null)
            {
                return NotFound();
            }

            patch.Patch(dbo_ctl_ts__company_information);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!dbo_CTL_TS__COMPANY_INFORMATIONExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(dbo_ctl_ts__company_information);
        }

        // DELETE odata/Company(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Delete([FromODataUri] string key)
        {
            TLCompany dbo_ctl_ts__company_information = db.TLCompanies.Find(key);
            if (dbo_ctl_ts__company_information == null)
            {
                return NotFound();
            }

            db.TLCompanies.Remove(dbo_ctl_ts__company_information);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET odata/Company(5)/Employees
        public IQueryable<Employee> GetEmployees([FromODataUri] string key)
        {
            return db.TLCompanies.Where(m => m.DBID == key).SelectMany(m => m.Employees);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool dbo_CTL_TS__COMPANY_INFORMATIONExists(string key)
        {
            return db.TLCompanies.Count(e => e.DBID == key) > 0;
        }
    }
}