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
    public class ClassAttendeeController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET odata/ClassAttendee
        public IQueryable<ClassAttendee> GetClassAttendee()
        {
            return db.ClassAttendees;
        }

        // GET odata/ClassAttendee(5)
        public SingleResult<ClassAttendee> GetClassAttendee(int key)
        {
            return SingleResult.Create(db.ClassAttendees.Where(classattendee => classattendee.ClassAttendeeID == key));
        }

        // PUT odata/ClassAttendee(5)
        public IHttpActionResult Put(int key, ClassAttendee classattendee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != classattendee.ClassAttendeeID)
            {
                return BadRequest();
            }

            db.Entry(classattendee).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassAttendeeExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(classattendee);
        }

        // POST odata/ClassAttendee
        public IHttpActionResult Post(ClassAttendee classattendee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!db.ClassAttendees.Any(x => x.ClassID == classattendee.ClassID && x.EmployeeID == classattendee.EmployeeID))
            {
                db.ClassAttendees.Add(classattendee);
                db.SaveChanges();
            }


            return Ok(classattendee);
        }

        // PATCH odata/ClassAttendee(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch(int key, Delta<ClassAttendee> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ClassAttendee classattendee = db.ClassAttendees.Find(key);
            if (classattendee == null)
            {
                return NotFound();
            }

            patch.Patch(classattendee);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassAttendeeExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(classattendee);
        }

        // DELETE odata/ClassAttendee(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            ClassAttendee classattendee = db.ClassAttendees.Find(key);
            if (classattendee == null)
            {
                return NotFound();
            }

            db.ClassAttendees.Remove(classattendee);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET odata/ClassAttendee(5)/Employee
        [Queryable]
        public SingleResult<Employee> GetEmployee([FromODataUri] int key)
        {
            return SingleResult.Create(db.ClassAttendees.Where(m => m.ClassAttendeeID == key).Select(m => m.Employee));
        }

        // GET odata/ClassAttendee(5)/Class
        [Queryable]
        public SingleResult<Class> GetClass([FromODataUri] int key)
        {
            return SingleResult.Create(db.ClassAttendees.Where(m => m.ClassAttendeeID == key).Select(m => m.Class));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClassAttendeeExists(int key)
        {
            return db.ClassAttendees.Count(e => e.ClassAttendeeID == key) > 0;
        }
    }
}