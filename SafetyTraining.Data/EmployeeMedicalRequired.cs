//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SafetyTraining.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class EmployeeMedicalRequired
    {
        public int EmployeeMedicalRequiredID { get; set; }
        public Nullable<int> EmployeeID { get; set; }
        public Nullable<int> MedicalTestID { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
    
        public virtual Employee Employee { get; set; }
        public virtual MedicalTest MedicalTest { get; set; }
    }
}
