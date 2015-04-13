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
    public class JobsController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();



        // GET odata/Jobs
        public IQueryable<Job> GetJobs()
        {
            return db.Jobs;
        }

        // GET odata/Jobs(5)
        public SingleResult<Job> GetJob(int key)
        {
            return SingleResult.Create(db.Jobs.Where(job => job.JobID == key));
        }

        // PUT odata/Jobs(5)
        public IHttpActionResult Put(int key, Job job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != job.JobID)
            {
                return BadRequest();
            }

            db.Entry(job).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(job);
        }

        // POST odata/Jobs
        public IHttpActionResult Post(Job job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Jobs.Add(job);
            db.SaveChanges();

            return Ok(job);
        }

        // PATCH odata/Jobs(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch(int key, Delta<Job> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Job job = db.Jobs.Find(key);
            if (job == null)
            {
                return NotFound();
            }

            patch.Patch(job);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(job);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool JobExists(int key)
        {
            return db.Jobs.Count(e => e.JobID == key) > 0;
        }

        
    }
}