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
    public class EmployeeNotesController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET: odata/EmployeeNotes
        public IQueryable<EmployeeNote> GetEmployeeNotes()
        {
            return db.EmployeeNotes;
        }

        // GET: odata/EmployeeNotes(5)
        public SingleResult<EmployeeNote> GetEmployeeNote(int key)
        {
            return SingleResult.Create(db.EmployeeNotes.Where(employeeNote => employeeNote.EmployeeNoteID == key));
        }

        // PUT: odata/EmployeeNotes(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Put(int key, Delta<EmployeeNote> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            EmployeeNote employeeNote = db.EmployeeNotes.Find(key);
            if (employeeNote == null)
            {
                return NotFound();
            }

            patch.Put(employeeNote);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeNoteExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(employeeNote);
        }

        // POST: odata/EmployeeNotes
        [NotHas("ReadOnly")]
        public IHttpActionResult Post(EmployeeNote employeeNote)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.EmployeeNotes.Add(employeeNote);
            db.SaveChanges();

            return Ok(employeeNote);
        }

        // PATCH: odata/EmployeeNotes(5)
        [AcceptVerbs("PATCH", "MERGE")]
        [NotHas("ReadOnly")]
        public IHttpActionResult Patch(int key, Delta<EmployeeNote> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            EmployeeNote employeeNote = db.EmployeeNotes.Find(key);
            if (employeeNote == null)
            {
                return NotFound();
            }

            patch.Patch(employeeNote);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeNoteExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(employeeNote);
        }

        // DELETE: odata/EmployeeNotes(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            EmployeeNote employeeNote = db.EmployeeNotes.Find(key);
            if (employeeNote == null)
            {
                return NotFound();
            }

            db.EmployeeNotes.Remove(employeeNote);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/EmployeeNotes(5)/Employee
        public SingleResult<Employee> GetEmployee(int key)
        {
            return SingleResult.Create(db.EmployeeNotes.Where(m => m.EmployeeNoteID == key).Select(m => m.Employee));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeNoteExists(int key)
        {
            return db.EmployeeNotes.Count(e => e.EmployeeNoteID == key) > 0;
        }
    }
}