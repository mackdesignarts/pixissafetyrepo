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
using System.Web.Http.OData;
using SafetyTraining.Web.ActionFilters;

namespace SafetyTraining.Web.Controllers
{
    public class UserCompaniesController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET: odata/UserCompanies
        public IQueryable<UserCompany> GetUserCompanies()
        {
            var limited = Request.RequestUri.ParseQueryString().Get("limited");
            if (String.IsNullOrEmpty(limited))
            {
                return db.UserCompanies;
            }
            else
            {
                IEnumerable<string> headerValues = Request.Headers.GetValues("UserId");
                var UserId = int.Parse(headerValues.FirstOrDefault());
                return db.UserCompanies.Where(uc => uc.UserID == UserId);
            }
        }

        // GET: odata/UserCompanies(5)
        public SingleResult<UserCompany> GetUserCompany(long key)
        {
            return SingleResult.Create(db.UserCompanies.Where(userCompany => userCompany.UserCompanyID == key));
        }

        // PUT: odata/UserCompanies(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Put(long key, Delta<UserCompany> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserCompany userCompany = db.UserCompanies.Find(key);
            if (userCompany == null)
            {
                return NotFound();
            }

            patch.Put(userCompany);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserCompanyExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(userCompany);
        }

        // POST: odata/UserCompanies
        [NotHas("ReadOnly")]
        public IHttpActionResult Post(UserCompany userCompany)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserCompanies.Add(userCompany);
            db.SaveChanges();

            return Ok(userCompany);
        }

        // PATCH: odata/UserCompanies(5)
        [AcceptVerbs("PATCH", "MERGE")]
        [NotHas("ReadOnly")]
        public IHttpActionResult Patch([FromODataUri] long key, Delta<UserCompany> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserCompany userCompany = db.UserCompanies.Find(key);
            if (userCompany == null)
            {
                return NotFound();
            }

            patch.Patch(userCompany);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserCompanyExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(userCompany);
        }

        // DELETE: odata/UserCompanies(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Delete([FromODataUri] long key)
        {
            UserCompany userCompany = db.UserCompanies.Find(key);
            if (userCompany == null)
            {
                return NotFound();
            }

            db.UserCompanies.Remove(userCompany);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/UserCompanies(5)/User
        public SingleResult<User> GetUser([FromODataUri] long key)
        {
            return SingleResult.Create(db.UserCompanies.Where(m => m.UserCompanyID == key).Select(m => m.User));
        }

        // GET: odata/UserCompanies(5)/TLCompany
        public SingleResult<TLCompany> GetTLCompany([FromODataUri] long key)
        {
            return SingleResult.Create(db.UserCompanies.Where(m => m.UserCompanyID == key).Select(m => m.TLCompany));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserCompanyExists(long key)
        {
            return db.UserCompanies.Count(e => e.UserCompanyID == key) > 0;
        }
    }
}