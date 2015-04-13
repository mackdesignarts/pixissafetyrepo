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
    public class CrewController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET odata/Crew
        public IQueryable<Crew> GetCrew()
        {
            return db.Crews;
        }

        // GET odata/Crew(5)
        public SingleResult<Crew> GetCrew(int key)
        {
            return SingleResult.Create(db.Crews.Where(crew => crew.CrewID == key));
        }

        // PUT odata/Crew(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Put(int key, Crew crew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != crew.CrewID)
            {
                return BadRequest();
            }

            db.Entry(crew).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CrewExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(crew);
        }

        // POST odata/Crew
        [NotHas("ReadOnly")]
        public IHttpActionResult Post(Crew crew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Crews.Add(crew);
            db.SaveChanges();

            return Ok(crew);
        }

        // PATCH odata/Crew(5)
        [AcceptVerbs("PATCH", "MERGE")]
        [NotHas("ReadOnly")]
        public IHttpActionResult Patch(int key, Delta<Crew> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Crew crew = db.Crews.Find(key);
            if (crew == null)
            {
                return NotFound();
            }

            patch.Patch(crew);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CrewExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(crew);
        }

        // DELETE odata/Crew(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Crew crew = db.Crews.Find(key);
            if (crew == null)
            {
                return NotFound();
            }

            db.Crews.Remove(crew);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET odata/Crew(5)/CrewDetails
        public IQueryable<CrewDetail> GetCrewDetails([FromODataUri] int key)
        {
            return db.Crews.Where(m => m.CrewID == key).SelectMany(m => m.CrewDetails);
        }

        // GET odata/Crew(5)/CrewStatu
        public SingleResult<CrewStatu> GetCrewStatu([FromODataUri] int key)
        {
            return SingleResult.Create(db.Crews.Where(m => m.CrewID == key).Select(m => m.CrewStatu));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CrewExists(int key)
        {
            return db.Crews.Count(e => e.CrewID == key) > 0;
        }
    }
}