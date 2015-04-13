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
    public class CrewDetailController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET odata/CrewDetail
        public IQueryable<CrewDetail> GetCrewDetail()
        {
            return db.CrewDetails;
        }

        // GET odata/CrewDetail(5)
        public SingleResult<CrewDetail> GetCrewDetail(int key)
        {
            return SingleResult.Create(db.CrewDetails.Where(crewdetail => crewdetail.CrewDetailID == key));
        }

        // PUT odata/CrewDetail(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Put(int key, CrewDetail crewdetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != crewdetail.CrewDetailID)
            {
                return BadRequest();
            }

            db.Entry(crewdetail).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CrewDetailExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(crewdetail);
        }

        // POST odata/CrewDetail
        [NotHas("ReadOnly")]
        public IHttpActionResult Post(CrewDetail crewdetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CrewDetails.Add(crewdetail);
            db.SaveChanges();

            return Ok(crewdetail);
        }

        // PATCH odata/CrewDetail(5)
        [AcceptVerbs("PATCH", "MERGE")]
        [NotHas("ReadOnly")]
        public IHttpActionResult Patch(int key, Delta<CrewDetail> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CrewDetail crewdetail = db.CrewDetails.Find(key);
            if (crewdetail == null)
            {
                return NotFound();
            }

            patch.Patch(crewdetail);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CrewDetailExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(crewdetail);
        }

        // DELETE odata/CrewDetail(5)
        [NotHas("ReadOnly")]
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            CrewDetail crewdetail = db.CrewDetails.Find(key);
            if (crewdetail == null)
            {
                return NotFound();
            }

            db.CrewDetails.Remove(crewdetail);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET odata/CrewDetail(5)/Crew
        public SingleResult<Crew> GetCrew([FromODataUri] int key)
        {
            return SingleResult.Create(db.CrewDetails.Where(m => m.CrewDetailID == key).Select(m => m.Crew));
        }

        //// OLD GET odata/CrewDetail(5)/Employee
        //public SingleResult<Employee> GetEmployee([FromODataUri] int key)
        //{
        //    return SingleResult.Create(db.CrewDetails.Where(m => m.CrewDetailID == key).Select(m => m.Employee));
        //}

        // NEW GET api/CrewDetail/5
        //public IHttpActionResult GetEmployee([FromODataUri] int key)
        //{

        //    // TODO: CrewDetail does not contain Employee

        //    //var res = db.CrewDetails.Where(m => m.CrewDetailID == key).Select(m => m.Employee);
        //    //return Ok(res);

        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CrewDetailExists(int key)
        {
            return db.CrewDetails.Count(e => e.CrewDetailID == key) > 0;
        }
    }
}