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
    public class RegionController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET odata/Region
        public IQueryable<Region> GetRegion()
        {
            return db.Regions;
        }

        // GET odata/Region(5)
        public SingleResult<Region> GetRegion(byte key)
        {
            return SingleResult.Create(db.Regions.Where(region => region.RegionID == key));
        }

        // PUT odata/Region(5)
        public IHttpActionResult Put(byte key, Region region)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != region.RegionID)
            {
                return BadRequest();
            }

            db.Entry(region).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegionExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(region);
        }

        // POST odata/Region
        public IHttpActionResult Post(Region region)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Regions.Add(region);
            db.SaveChanges();

            return Ok(region);
        }

        // PATCH odata/Region(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch(byte key, Delta<Region> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Region region = db.Regions.Find(key);
            if (region == null)
            {
                return NotFound();
            }

            patch.Patch(region);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegionExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(region);
        }

        // DELETE odata/Region(5)
        public IHttpActionResult Delete([FromODataUri] byte key)
        {
            Region region = db.Regions.Find(key);
            if (region == null)
            {
                return NotFound();
            }

            db.Regions.Remove(region);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET odata/Region(5)/Classes
        public IQueryable<Class> GetClasses([FromODataUri] byte key)
        {
            return db.Regions.Where(m => m.RegionID == key).SelectMany(m => m.Classes);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RegionExists(byte key)
        {
            return db.Regions.Count(e => e.RegionID == key) > 0;
        }
    }
}