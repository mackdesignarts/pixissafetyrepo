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
    public class CourseController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET odata/Course
        public IQueryable<Course> GetCourse()
        {
            return db.Courses;
        }

        // GET odata/Course(5)
        public SingleResult<Course> GetCourse(int key)
        {
            return SingleResult.Create(db.Courses.Where(course => course.CourseID == key));
        }

        // PUT odata/Course(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Put(int key, Course course)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != course.CourseID)
            {
                return BadRequest();
            }

            db.Entry(course).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(course);
        }

        // POST odata/Course
        [NotHas("ReadOnly")]
        public IHttpActionResult Post(Course course)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Courses.Add(course);
            db.SaveChanges();

            return Ok(course);
        }

        // PATCH odata/Course(5)
        [AcceptVerbs("PATCH", "MERGE")]
        [NotHas("ReadOnly")]
        public IHttpActionResult Patch(int key, Delta<Course> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Course course = db.Courses.Find(key);
            if (course == null)
            {
                return NotFound();
            }

            patch.Patch(course);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(course);
        }

        // DELETE odata/Course(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Course course = db.Courses.Find(key);
            if (course == null)
            {
                return NotFound();
            }

            db.Courses.Remove(course);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET odata/Course(5)/CertificationAgency
        public SingleResult<CertificationAgency> GetCertificationAgency([FromODataUri] int key)
        {
            return SingleResult.Create(db.Courses.Where(m => m.CourseID == key).Select(m => m.CertificationAgency));
        }

        // GET odata/Course(5)/CoursesTakens
        public IQueryable<CoursesTaken> GetCoursesTakens([FromODataUri] int key)
        {
            return db.Courses.Where(m => m.CourseID == key).SelectMany(m => m.CoursesTakens).Where(m => m.CertificationStatusID == 1);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CourseExists(int key)
        {
            return db.Courses.Count(e => e.CourseID == key) > 0;
        }
    }
}