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
    public class ClassSessionController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET odata/ClassSession
        public IQueryable<ClassSession> GetClassSession()
        {
            return db.ClassSessions;
        }

        // GET odata/ClassSession(5)
        public SingleResult<ClassSession> GetClassSession(int key)
        {
            return SingleResult.Create(db.ClassSessions.Where(classsession => classsession.ClassSessionID == key));
        }

        // PUT odata/ClassSession(5)
        public IHttpActionResult Put(int key, ClassSession classsession)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != classsession.ClassSessionID)
            {
                return BadRequest();
            }

            db.Entry(classsession).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassSessionExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(classsession);
        }

        // POST odata/ClassSession
        public IHttpActionResult Post(ClassSession classsession)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }



            if (!db.ClassSessions.Any(x => x.ClassID == classsession.ClassID && x.CourseID == classsession.CourseID))
            {
                db.ClassSessions.Add(classsession);
                db.SaveChanges();
            }



            return Ok(classsession);
        }

        // PATCH odata/ClassSession(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch(int key, Delta<ClassSession> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ClassSession classsession = db.ClassSessions.Find(key);
            if (classsession == null)
            {
                return NotFound();
            }

            patch.Patch(classsession);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassSessionExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(classsession);
        }

        // DELETE odata/ClassSession(5)
        public IHttpActionResult Delete(int key)
        {
            ClassSession classsession = db.ClassSessions.Find(key);
            if (classsession == null)
            {
                return NotFound();
            }

            db.ClassSessions.Remove(classsession);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET odata/ClassSession(5)/Course
        [Queryable]
        public SingleResult<Course> GetCourse([FromODataUri] int key)
        {
            return SingleResult.Create(db.ClassSessions.Where(m => m.ClassSessionID == key).Select(m => m.Course));
        }

        // GET odata/ClassSession(5)/Class
        [Queryable]
        public SingleResult<Class> GetClass([FromODataUri] int key)
        {
            return SingleResult.Create(db.ClassSessions.Where(m => m.ClassSessionID == key).Select(m => m.Class));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClassSessionExists(int key)
        {
            return db.ClassSessions.Count(e => e.ClassSessionID == key) > 0;
        }

       
    }
}