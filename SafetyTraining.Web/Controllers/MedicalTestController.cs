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
    public class MedicalTestController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // GET odata/MedicalTest
        public IQueryable<MedicalTest> GetMedicalTest()
        {
            return db.MedicalTests;
        }

        // GET odata/MedicalTest(5)
        public SingleResult<MedicalTest> GetMedicalTest(int key)
        {
            return SingleResult.Create(db.MedicalTests.Where(medicaltest => medicaltest.MedicalTestID == key));
        }

        // PUT odata/MedicalTest(5)
        public IHttpActionResult Put(int key, MedicalTest medicaltest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (key != medicaltest.MedicalTestID)
            {
                return BadRequest();
            }

            db.Entry(medicaltest).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedicalTestExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(medicaltest);
        }

        // POST odata/MedicalTest
        public IHttpActionResult Post(MedicalTest medicaltest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.MedicalTests.Add(medicaltest);
            db.SaveChanges();

            return Ok(medicaltest);
        }

        // PATCH odata/MedicalTest(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch(int key, Delta<MedicalTest> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            MedicalTest medicaltest = db.MedicalTests.Find(key);
            if (medicaltest == null)
            {
                return NotFound();
            }

            patch.Patch(medicaltest);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedicalTestExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(medicaltest);
        }

        // DELETE odata/MedicalTest(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            MedicalTest medicaltest = db.MedicalTests.Find(key);
            if (medicaltest == null)
            {
                return NotFound();
            }

            db.MedicalTests.Remove(medicaltest);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET odata/MedicalTest(5)/EmployeeMedicals
        public IQueryable<EmployeeMedical> GetEmployeeMedicals([FromODataUri] int key)
        {
            return db.MedicalTests.Where(m => m.MedicalTestID == key).SelectMany(m => m.EmployeeMedicals);
        }

        // GET odata/MedicalTest(5)/EmployeeMedicalRequireds
        public IQueryable<EmployeeMedicalRequired> GetEmployeeMedicalRequireds([FromODataUri] int key)
        {
            return db.MedicalTests.Where(m => m.MedicalTestID == key).SelectMany(m => m.EmployeeMedicalRequireds);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MedicalTestExists(int key)
        {
            return db.MedicalTests.Count(e => e.MedicalTestID == key) > 0;
        }
    }
}