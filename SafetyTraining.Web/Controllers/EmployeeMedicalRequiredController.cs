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

namespace SafetyTraining.Web.Controllers
{
    public class EmployeeMedicalRequiredController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET odata/EmployeeMedicalRequired
        public IQueryable<EmployeeMedicalRequired> GetEmployeeMedicalRequired()
        {
            return db.EmployeeMedicalRequireds;
        }

        // GET odata/EmployeeMedicalRequired(5)
        public SingleResult<EmployeeMedicalRequired> GetEmployeeMedicalRequired(int key)
        {
            return SingleResult.Create(db.EmployeeMedicalRequireds.Where(employeemedicalrequired => employeemedicalrequired.EmployeeMedicalRequiredID == key));
        }

        // PUT odata/EmployeeMedicalRequired(5)
        public IHttpActionResult Put(int key, EmployeeMedicalRequired employeemedicalrequired)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != employeemedicalrequired.EmployeeMedicalRequiredID)
            {
                return BadRequest();
            }

            db.Entry(employeemedicalrequired).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeMedicalRequiredExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(employeemedicalrequired);
        }

        // POST odata/EmployeeMedicalRequired
        public IHttpActionResult Post(EmployeeMedicalRequired employeemedicalrequired)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.EmployeeMedicalRequireds.Add(employeemedicalrequired);
            db.SaveChanges();

            return Ok(employeemedicalrequired);
        }

        // PATCH odata/EmployeeMedicalRequired(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch(int key, Delta<EmployeeMedicalRequired> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            EmployeeMedicalRequired employeemedicalrequired = db.EmployeeMedicalRequireds.Find(key);
            if (employeemedicalrequired == null)
            {
                return NotFound();
            }

            patch.Patch(employeemedicalrequired);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeMedicalRequiredExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(employeemedicalrequired);
        }

        // DELETE odata/EmployeeMedicalRequired(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            EmployeeMedicalRequired employeemedicalrequired = db.EmployeeMedicalRequireds.Find(key);
            if (employeemedicalrequired == null)
            {
                return NotFound();
            }

            db.EmployeeMedicalRequireds.Remove(employeemedicalrequired);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET odata/EmployeeMedicalRequired(5)/Employee
        [Queryable]
        public SingleResult<Employee> GetEmployee([FromODataUri] int key)
        {
            return SingleResult.Create(db.EmployeeMedicalRequireds.Where(m => m.EmployeeMedicalRequiredID == key).Select(m => m.Employee));
        }

        // GET odata/EmployeeMedicalRequired(5)/MedicalTest
        [Queryable]
        public SingleResult<MedicalTest> GetMedicalTest([FromODataUri] int key)
        {
            return SingleResult.Create(db.EmployeeMedicalRequireds.Where(m => m.EmployeeMedicalRequiredID == key).Select(m => m.MedicalTest));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeMedicalRequiredExists(int key)
        {
            return db.EmployeeMedicalRequireds.Count(e => e.EmployeeMedicalRequiredID == key) > 0;
        }
    }
}