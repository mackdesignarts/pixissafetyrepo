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
    public class InstructorController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET odata/Instructor
        public IQueryable<Instructor> GetInstructor()
        {
            if (!String.IsNullOrWhiteSpace((Request.RequestUri.ParseQueryString().Get("filtered"))) && (Request.RequestUri.ParseQueryString().Get("filtered")) == "1")
            {
                IEnumerable<string> headerValues = Request.Headers.GetValues("UserId");
                var UserId = int.Parse(headerValues.FirstOrDefault());
                return db.Instructors.Where(i => i.RegionID == db.Users.Where(u => u.UserID == UserId).FirstOrDefault().RegionID);
            }
            else
            {
                return db.Instructors;
            }
        }

        // GET odata/Instructor(5)
        public SingleResult<Instructor> GetInstructor(int key)
        {
            return SingleResult.Create(db.Instructors.Where(instructor => instructor.InstructorID == key));
        }

        // PUT odata/Instructor(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Put(int key, Instructor instructor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != instructor.InstructorID)
            {
                return BadRequest();
            }

            db.Entry(instructor).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InstructorExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(instructor);
        }

        // POST odata/Instructor
        [NotHas("ReadOnly")]
        public IHttpActionResult Post(Instructor instructor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Instructors.Add(instructor);
            db.SaveChanges();

            return Ok(instructor);
        }

        // PATCH odata/Instructor(5)
        [AcceptVerbs("PATCH", "MERGE")]
        [NotHas("ReadOnly")]
        public IHttpActionResult Patch(int key, Delta<Instructor> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Instructor instructor = db.Instructors.Find(key);
            if (instructor == null)
            {
                return NotFound();
            }

            patch.Patch(instructor);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InstructorExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(instructor);
        }

        // DELETE odata/Instructor(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Delete(int key)
        {
            Instructor instructor = db.Instructors.Find(key);
            if (instructor == null)
            {
                return NotFound();
            }

            db.Instructors.Remove(instructor);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET odata/Instructor(5)/CoursesTakens
        public IQueryable<CoursesTaken> GetCoursesTakens(int key)
        {
            return db.Instructors.Where(m => m.InstructorID == key).SelectMany(m => m.CoursesTakens);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool InstructorExists(int key)
        {
            return db.Instructors.Count(e => e.InstructorID == key) > 0;
        }
    }
}