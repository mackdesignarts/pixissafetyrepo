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
    public class EmployeeStatusIDController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET odata/EmployeeStatusID
        public IQueryable<EmployeeStatu> GetEmployeeStatusID()
        {
            return db.EmployeeStatus;
        }

        // GET odata/EmployeeStatusID(5)
        public SingleResult<EmployeeStatu> GetEmployeeStatu(byte key)
        {
            return SingleResult.Create(db.EmployeeStatus.Where(employeestatu => employeestatu.EmployeeStatusID == key));
        }

        // PUT odata/EmployeeStatusID(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Put(byte key, EmployeeStatu employeestatu)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != employeestatu.EmployeeStatusID)
            {
                return BadRequest();
            }

            db.Entry(employeestatu).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeStatuExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(employeestatu);
        }

        // POST odata/EmployeeStatusID
        [NotHas("ReadOnly")]
        public IHttpActionResult Post(EmployeeStatu employeestatu)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.EmployeeStatus.Add(employeestatu);
            db.SaveChanges();

            return Ok(employeestatu);
        }

        // PATCH odata/EmployeeStatusID(5)
        [AcceptVerbs("PATCH", "MERGE")]
        [NotHas("ReadOnly")]
        public IHttpActionResult Patch(byte key, Delta<EmployeeStatu> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            EmployeeStatu employeestatu = db.EmployeeStatus.Find(key);
            if (employeestatu == null)
            {
                return NotFound();
            }

            patch.Patch(employeestatu);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeStatuExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(employeestatu);
        }

        // DELETE odata/EmployeeStatusID(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Delete([FromODataUri] byte key)
        {
            EmployeeStatu employeestatu = db.EmployeeStatus.Find(key);
            if (employeestatu == null)
            {
                return NotFound();
            }

            db.EmployeeStatus.Remove(employeestatu);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET odata/EmployeeStatusID(5)/Employees
        public IQueryable<Employee> GetEmployees([FromODataUri] byte key)
        {
            return db.EmployeeStatus.Where(m => m.EmployeeStatusID == key).SelectMany(m => m.Employees);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeStatuExists(byte key)
        {
            return db.EmployeeStatus.Count(e => e.EmployeeStatusID == key) > 0;
        }
    }
}