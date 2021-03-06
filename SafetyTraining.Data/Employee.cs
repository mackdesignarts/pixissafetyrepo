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
    
    public partial class Employee
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Employee()
        {
            this.ClassAttendees = new HashSet<ClassAttendee>();
            this.CoursesTakens = new HashSet<CoursesTaken>();
            this.EmployeeNotes1 = new HashSet<EmployeeNote>();
            this.EmployeeNotesHistories = new HashSet<EmployeeNotesHistory>();
            this.EmployeeMedicals = new HashSet<EmployeeMedical>();
            this.EmployeeMedicalRequireds = new HashSet<EmployeeMedicalRequired>();
            this.EmployeeNotesHistories1 = new HashSet<EmployeeNotesHistory>();
        }
    
        public int EmployeeID { get; set; }
        public string TLEmployee { get; set; }
        public string EmployeeFirstName { get; set; }
        public string EmployeeLastName { get; set; }
        public Nullable<byte> EmployeeStatusID { get; set; }
        public string DBID { get; set; }
        public string Occupation { get; set; }
        public string Department { get; set; }
        public Nullable<System.DateTime> TerminationDate { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> HireDate { get; set; }
        public Nullable<short> PositionId { get; set; }
        public Nullable<System.DateTime> RehireDate { get; set; }
        public string EmployeeNotes { get; set; }
        public Nullable<System.DateTime> TLModifiedDate { get; set; }
        public string TLEmployeeName { get; set; }
        public Nullable<byte> Deleted { get; set; }
        public string LocationCode { get; set; }
        public Nullable<int> LocationCodeID { get; set; }
        public string EmployeeName { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ClassAttendee> ClassAttendees { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CoursesTaken> CoursesTakens { get; set; }
        public virtual TLCompany TLCompany { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EmployeeNote> EmployeeNotes1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EmployeeNotesHistory> EmployeeNotesHistories { get; set; }
        public virtual EmployeeStatu EmployeeStatu { get; set; }
        public virtual LocationCode LocationCode1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EmployeeMedical> EmployeeMedicals { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EmployeeMedicalRequired> EmployeeMedicalRequireds { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EmployeeNotesHistory> EmployeeNotesHistories1 { get; set; }
    }
}
