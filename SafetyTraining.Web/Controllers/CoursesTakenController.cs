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
    public class CoursesTakenController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET odata/CoursesTaken
        public IQueryable<CoursesTaken> GetCoursesTaken()
        {
            return db.CoursesTakens.Where(c => c.Deleted == false);// do not show deleted courses
        }

        // GET odata/CoursesTaken(5)
        public SingleResult<CoursesTaken> GetCoursesTaken(int key)
        {
            return SingleResult.Create(db.CoursesTakens.Where(coursestaken => coursestaken.CoursesTakenID == key && coursestaken.Deleted == false));
        }

        // PUT odata/CoursesTaken(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Put(int key, CoursesTaken coursestaken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != coursestaken.CoursesTakenID)
            {
                return BadRequest();
            }
            try
            {
                //db.spInsCoursesTaken(coursestaken.CourseID, coursestaken.EmployeeID, coursestaken.CertificationDate, coursestaken.ClassID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            //db.Entry(coursestaken).State = System.Data.Entity.EntityState.Modified;

            //try
            //{
            //    db.SaveChanges();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!CoursesTakenExists(key))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            return Ok(coursestaken);
        }

        // POST odata/CoursesTaken
        [AcceptVerbs("POST")]
        [NotHas("ReadOnly")]
        public IHttpActionResult Post(CoursesTaken coursestaken)
        {
            if (!ModelState.IsValid)
            {

                return BadRequest(ModelState);

            }
            try
            {
                //db.spInsCoursesTaken(coursestaken.CourseID, coursestaken.EmployeeID, coursestaken.CertificationDate, coursestaken.ClassID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            //db.CoursesTakens.Add(coursestaken);
            //db.SaveChanges();

            return Ok(coursestaken);
        }

        // PATCH odata/CoursesTaken(5)
        [AcceptVerbs("PATCH", "MERGE")]
        [NotHas("ReadOnly")]
        public IHttpActionResult Patch(int key, Delta<CoursesTaken> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CoursesTaken coursestaken = db.CoursesTakens.Find(key);
            if (coursestaken == null)
            {
                return NotFound();
            }

            patch.Patch(coursestaken);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoursesTakenExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(coursestaken);
        }

        // DELETE odata/CoursesTaken(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            CoursesTaken coursestaken = db.CoursesTakens.Find(key);
            if (coursestaken == null)
            {
                return NotFound();
            }

            db.CoursesTakens.Remove(coursestaken);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET odata/CoursesTaken(5)/Course
        public SingleResult<Course> GetCourse([FromODataUri] int key)
        {
            return SingleResult.Create(db.CoursesTakens.Where(m => m.CoursesTakenID == key).Select(m => m.Course));
        }

        // GET odata/CoursesTaken(5)/Employee
        public SingleResult<Employee> GetEmployee([FromODataUri] int key)
        {
            return SingleResult.Create(db.CoursesTakens.Where(m => m.CoursesTakenID == key).Select(m => m.Employee));
        }

        // GET odata/CoursesTaken(5)/Instructor
        public SingleResult<Instructor> GetInstructor([FromODataUri] int key)
        {
            return SingleResult.Create(db.CoursesTakens.Where(m => m.CoursesTakenID == key).Select(m => m.Instructor));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CoursesTakenExists(int key)
        {
            return db.CoursesTakens.Count(e => e.CoursesTakenID == key) > 0;
        }
    }
}