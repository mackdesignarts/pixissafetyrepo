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
    
    public partial class PRM_MASTER__EMPLOYEE
    {
        public string DBID { get; set; }
        public string Employee { get; set; }
        public string Employee_Name { get; set; }
        public string Title { get; set; }
        public string Occupation { get; set; }
        public string Country { get; set; }
        public string Address_1 { get; set; }
        public string Address_2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip_Code { get; set; }
        public string Foreign_State { get; set; }
        public string Foreign_Postal_Code { get; set; }
        public string Email_address { get; set; }
        public string Phone_Number { get; set; }
        public string Social_Security_Number { get; set; }
        public string Pay_Group { get; set; }
        public Nullable<bool> SM_Employee { get; set; }
        public string Gender { get; set; }
        public string Skill_Level { get; set; }
        public Nullable<System.DateTime> Birth_Date { get; set; }
        public string Ethnic { get; set; }
        public string Resident_State { get; set; }
        public string Work_State { get; set; }
        public string Resident_Local { get; set; }
        public string Work_Local { get; set; }
        public Nullable<bool> Use_Employee_Work_State { get; set; }
        public string Workers_Comp_State { get; set; }
        public string WC_Code { get; set; }
        public string Filing_Status { get; set; }
        public string EIC_Status { get; set; }
        public Nullable<short> Personal_Exemptions { get; set; }
        public Nullable<short> Misc_Tax_Code { get; set; }
        public string Pay_ID { get; set; }
        public string Job { get; set; }
        public string JC_Cost_Code { get; set; }
        public string Equipment { get; set; }
        public string EQ_Cost_Code { get; set; }
        public string Union_ID { get; set; }
        public string Union_Local { get; set; }
        public string Union_Class { get; set; }
        public string Department { get; set; }
        public string Certified_Class { get; set; }
        public string Shift { get; set; }
        public string Not_Used { get; set; }
        public string Misc_1 { get; set; }
        public string Misc_2 { get; set; }
        public Nullable<bool> Retirement_Plan { get; set; }
        public Nullable<bool> rd_Party_Sick_Pay_3 { get; set; }
        public Nullable<bool> Auto_Bill_Revenue { get; set; }
        public Nullable<bool> Exclude_From_Cert_Report { get; set; }
        public Nullable<System.DateTime> Hire_Date { get; set; }
        public Nullable<bool> HIRE_Act_Qualified { get; set; }
        public Nullable<System.DateTime> Rehire_Date { get; set; }
        public Nullable<System.DateTime> Termination_Date { get; set; }
        public string Custom_Sort { get; set; }
        public Nullable<double> Max_Check_Amount { get; set; }
        public Nullable<long> Last_Check_Number { get; set; }
        public Nullable<System.DateTime> Last_Check_Date { get; set; }
        public Nullable<double> Last_Check_Amount { get; set; }
        public Nullable<bool> EVERIFY { get; set; }
        public Nullable<bool> SALARY { get; set; }
        public Nullable<bool> HOURLY { get; set; }
        public Nullable<bool> UNION { get; set; }
        public Nullable<bool> HEALTH { get; set; }
        public Nullable<bool> DENTAL { get; set; }
        public Nullable<bool> VOLUNTARY_LIFE { get; set; }
        public Nullable<bool> FLEX_PLAN { get; set; }
        public Nullable<bool> EXCL_TIME_JRL { get; set; }
        public Nullable<bool> DIRECT_DEPOSIT { get; set; }
        public Nullable<double> Prior_Year_Regular_Pay { get; set; }
        public Nullable<double> YTD_Regular_Pay { get; set; }
        public Nullable<double> Prior_Year_Overtime_Pay { get; set; }
        public Nullable<double> YTD_Overtime_Pay { get; set; }
        public Nullable<double> Prior_Year_Other_Pay { get; set; }
        public Nullable<double> YTD_Other_Pay { get; set; }
        public Nullable<double> Prior_Year_Gross_Pay { get; set; }
        public Nullable<double> YTD_Gross_Pay { get; set; }
        public Nullable<double> Prior_Year_Employee_Taxes { get; set; }
        public Nullable<double> YTD_Employee_Taxes { get; set; }
        public Nullable<double> Prior_Yr_Misc_Deductions { get; set; }
        public Nullable<double> YTD_Misc_Deductions { get; set; }
        public Nullable<double> Prior_Yr_Direct_Deposits { get; set; }
        public Nullable<double> YTD_Direct_Deposits { get; set; }
        public Nullable<double> Prior_Year_Net_Pay { get; set; }
        public Nullable<double> YTD_Net_Pay { get; set; }
        public Nullable<double> Prior_Year_Regular_Hours { get; set; }
        public Nullable<double> YTD_Regular_Hours { get; set; }
        public Nullable<double> Prior_Year_Overtime_Hours { get; set; }
        public Nullable<double> YTD_Overtime_Hours { get; set; }
        public Nullable<double> Prior_Year_Employer_Taxes { get; set; }
        public Nullable<double> YTD_Employer_Taxes { get; set; }
        public Nullable<double> Prior_Year_Fringes { get; set; }
        public Nullable<double> YTD_Fringes { get; set; }
        public Nullable<double> Prior_Qtr_Regular_Pay { get; set; }
        public Nullable<double> QTD_Regular_Pay { get; set; }
        public Nullable<double> Prior_Qtr_Overtime_Pay { get; set; }
        public Nullable<double> QTD_Overtime_Pay { get; set; }
        public Nullable<double> Prior_Qtr_Other_Pay { get; set; }
        public Nullable<double> QTD_Other_Pay { get; set; }
        public Nullable<double> Prior_Qtr_Gross_Pay { get; set; }
        public Nullable<double> QTD_Gross_Pay { get; set; }
        public Nullable<double> Prior_Qtr_Employee_Taxes { get; set; }
        public Nullable<double> QTD_Employee_Taxes { get; set; }
        public Nullable<double> Prior_Qtr_Misc_Deductions { get; set; }
        public Nullable<double> QTD_Misc_Deductions { get; set; }
        public Nullable<double> Prior_Qtr_Direct_Deposits { get; set; }
        public Nullable<double> QTD_Direct_Deposits { get; set; }
        public Nullable<double> Prior_Qtr_Net_Pay { get; set; }
        public Nullable<double> QTD_Net_Pay { get; set; }
        public Nullable<double> Prior_Qtr_Regular_Hours { get; set; }
        public Nullable<double> QTD_Regular_Hours { get; set; }
        public Nullable<double> Prior_Qtr_Overtime_Hours { get; set; }
        public Nullable<double> QTD_Overtime_Hours { get; set; }
        public Nullable<double> Prior_Qtr_Employer_Taxes { get; set; }
        public Nullable<double> QTD_Employer_Taxes { get; set; }
        public Nullable<double> Prior_Qtr_Fringes { get; set; }
        public Nullable<double> QTD_Fringes { get; set; }
        public Nullable<double> Prior_Month_Regular_Pay { get; set; }
        public Nullable<double> MTD_Regular_Pay { get; set; }
        public Nullable<double> Prior_Month_Overtime_Pay { get; set; }
        public Nullable<double> MTD_Overtime_Pay { get; set; }
        public Nullable<double> Prior_Month_Other_Pay { get; set; }
        public Nullable<double> MTD_Other_Pay { get; set; }
        public Nullable<double> Prior_Month_Gross_Pay { get; set; }
        public Nullable<double> MTD_Gross_Pay { get; set; }
        public Nullable<double> Prior_Mth_Employee_Taxes { get; set; }
        public Nullable<double> MTD_Employee_Taxes { get; set; }
        public Nullable<double> Prior_Mth_Misc_Deductions { get; set; }
        public Nullable<double> MTD_Misc_Deductions { get; set; }
        public Nullable<double> Prior_Mth_Direct_Deposits { get; set; }
        public Nullable<double> MTD_Direct_Deposits { get; set; }
        public Nullable<double> Prior_Month_Net_Pay { get; set; }
        public Nullable<double> MTD_Net_Pay { get; set; }
        public Nullable<double> Prior_Month_Regular_Hours { get; set; }
        public Nullable<double> MTD_Regular_Hours { get; set; }
        public Nullable<double> Prior_Mth_Overtime_Hours { get; set; }
        public Nullable<double> MTD_Overtime_Hours { get; set; }
        public Nullable<double> Prior_Mth_Employer_Taxes { get; set; }
        public Nullable<double> MTD_Employer_Taxes { get; set; }
        public Nullable<double> Prior_Month_Fringes { get; set; }
        public Nullable<double> MTD_Fringes { get; set; }
        public string Operator_Stamp { get; set; }
        public Nullable<System.DateTime> Date_Stamp { get; set; }
        public string Time_Stamp { get; set; }
        public string Employee_Notes { get; set; }
        public string Employee_File_Links { get; set; }
        public Nullable<bool> CASH_PAY { get; set; }
        public Nullable<bool> TEMP_EMPLOYEE { get; set; }
        public Nullable<bool> Check_List_1 { get; set; }
        public Nullable<bool> Check_List_2 { get; set; }
        public Nullable<bool> Check_List_3 { get; set; }
        public Nullable<bool> Check_List_4 { get; set; }
        public Nullable<bool> Check_List_5 { get; set; }
        public Nullable<bool> Check_List_6 { get; set; }
        public Nullable<bool> Check_List_7 { get; set; }
        public Nullable<bool> Check_List_8 { get; set; }
        public Nullable<bool> Check_List_9 { get; set; }
        public Nullable<bool> Check_List_10 { get; set; }
        public Nullable<bool> Salary_Employee { get; set; }
        public Nullable<bool> LIFE_VOLUNTARY { get; set; }
        public string Mobile_phone { get; set; }
        public string Termination_Reason { get; set; }
        public string ACA_Exempt { get; set; }
        public string ACA_Coverage_Code { get; set; }
        public Nullable<double> ACA_Premium_Share { get; set; }
        public string ACA_Safe_Harbor_Code { get; set; }
    }
}