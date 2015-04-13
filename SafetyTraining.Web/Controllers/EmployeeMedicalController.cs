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

namespace SafetyTraining.Web.Controllers
{
    public class EmployeeMedicalController : ApiController
    {
        private PixisSafetyDBEntities db = new PixisSafetyDBEntities();

        // TODO: Schema doesnt match EmployeeMedical / No EmployeeMedicalExt exists in DB

        //// GET odata/EmployeeMedical
        //[Queryable]
        //public IQueryable<EmployeeMedicalExt> GetEmployeeMedical()
        //{
        //    var meds = from em in db.EmployeeMedicals
        //               join mt in db.MedicalTests on em.MedicalTestID equals mt.MedicalTestID
        //               select new EmployeeMedicalExt
        //               {
        //                   EmployeeMedicalID = em.EmployeeMedicalID,
        //                   EmployeeID = em.EmployeeID,
        //                   MedicalTestID = em.MedicalTestID,
        //                   MedicalTestDate = em.MedicalTestDate,
        //                   MedicalNote = em.MedicalNote,
        //                   CreatedOn = em.CreatedOn,
        //                   MedicalExpireDate = em.MedicalExpireDate,
        //                   ModifiedOn = em.ModifiedOn,
        //                   MedicalTestType = mt.MedicalTest1,
        //                   Deleted = em.Deleted
        //               };

        //    return meds;
        //}

        //// GET odata/EmployeeMedical(5)
        //[Queryable]
        //public SingleResult<EmployeeMedicalExt> GetEmployeeMedical([FromODataUri] int key)
        //{
        //    var med = (from em in db.EmployeeMedicals
        //               join mt in db.MedicalTests on em.MedicalTestID equals mt.MedicalTestID
        //               where em.EmployeeMedicalID == key
        //               select new EmployeeMedicalExt
        //               {
        //                   EmployeeMedicalID = em.EmployeeMedicalID,
        //                   EmployeeID = em.EmployeeID,
        //                   MedicalTestID = em.MedicalTestID,
        //                   MedicalTestDate = em.MedicalTestDate,
        //                   MedicalNote = em.MedicalNote,
        //                   CreatedOn = em.CreatedOn,
        //                   MedicalExpireDate = em.MedicalExpireDate,
        //                   ModifiedOn = em.ModifiedOn,
        //                   MedicalTestType = mt.MedicalTest1,
        //                   Deleted = em.Deleted
        //               });

        //    return SingleResult.Create(med);

        //    //return SingleResult.Create(db.EmployeeMedicals.Where(employeemedical => employeemedical.EmployeeMedicalID == key));
        //}

        //// PUT odata/EmployeeMedical(5)
        //public IHttpActionResult Put([FromODataUri] int key, EmployeeMedical employeemedical)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (key != employeemedical.EmployeeMedicalID)
        //    {
        //        return BadRequest();
        //    }


        //    db.Entry(employeemedical).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!EmployeeMedicalExists(key))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return Updated(employeemedical);
        //}

        //// POST odata/EmployeeMedical
        //public IHttpActionResult Post(EmployeeMedical employeemedical)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.EmployeeMedicals.Add(employeemedical);
        //    db.SaveChanges();

        //    return Created(employeemedical);
        //}

        //// PATCH odata/EmployeeMedical(5)
        //[AcceptVerbs("PATCH", "MERGE")]
        //public IHttpActionResult Patch([FromODataUri] int key, Delta<EmployeeMedical> patch)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    EmployeeMedical employeemedical = db.EmployeeMedicals.Find(key);
        //    if (employeemedical == null)
        //    {
        //        return NotFound();
        //    }

        //    patch.Patch(employeemedical);

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!EmployeeMedicalExists(key))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return Updated(employeemedical);
        //}

        //// DELETE odata/EmployeeMedical(5)
        //public IHttpActionResult Delete([FromODataUri] int key)
        //{
        //    EmployeeMedical employeemedical = db.EmployeeMedicals.Find(key);
        //    if (employeemedical == null)
        //    {
        //        return NotFound();
        //    }

        //    db.EmployeeMedicals.Remove(employeemedical);
        //    db.SaveChanges();

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        //// GET odata/EmployeeMedical(5)/Employee
        //[Queryable]
        //public SingleResult<Employee> GetEmployee([FromODataUri] int key)
        //{
        //    return SingleResult.Create(db.EmployeeMedicals.Where(m => m.EmployeeMedicalID == key).Select(m => m.Employee));
        //}

        //// GET odata/EmployeeMedical(5)/MedicalTest
        //[Queryable]
        //public SingleResult<MedicalTest> GetMedicalTest([FromODataUri] int key)
        //{
        //    return SingleResult.Create(db.EmployeeMedicals.Where(m => m.EmployeeMedicalID == key).Select(m => m.MedicalTest));
        //}

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        db.Dispose();
        //    }
        //    base.Dispose(disposing);
        //}

        //private bool EmployeeMedicalExists(int key)
        //{
        //    return db.EmployeeMedicals.Count(e => e.EmployeeMedicalID == key) > 0;
        //}
    }
}