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
    
    public partial class dbo_JCM_MASTER__JOB_BAD
    {
        public string DBID { get; set; }
        public string Job { get; set; }
        public string Description { get; set; }
        public string Address_1 { get; set; }
        public string Address_2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZIP_Code { get; set; }
        public string Type { get; set; }
        public string Size { get; set; }
        public string Unit_Description { get; set; }
        public string Security_ID { get; set; }
        public string Site_Phone { get; set; }
        public string Fax_Phone { get; set; }
        public string Misc_Phone { get; set; }
        public string Project_Manager { get; set; }
        public string Estimator { get; set; }
        public string Supervisor { get; set; }
        public string PM_Assistant { get; set; }
        public string Salesman { get; set; }
        public string User_Def_Key_1 { get; set; }
        public string User_Def_Key_2 { get; set; }
        public string Status { get; set; }
        public bool Use_PJ_Change_Management { get; set; }
        public string Extras { get; set; }
        public Nullable<System.DateTime> Estimated_Start_Date { get; set; }
        public Nullable<System.DateTime> Estimated_Comp_Date { get; set; }
        public Nullable<System.DateTime> Revised_Start_Date { get; set; }
        public Nullable<System.DateTime> Revised_Comp_Date { get; set; }
        public Nullable<System.DateTime> Actual_Start_Date { get; set; }
        public Nullable<System.DateTime> Actual_Complete_Date { get; set; }
        public Nullable<System.DateTime> Last_Cost_Update { get; set; }
        public bool Contract_recd { get; set; }
        public bool Submittal_sent { get; set; }
        public bool Submittal_recd { get; set; }
        public bool Percent_Billed_100 { get; set; }
        public bool Percent_COMP_REC_100 { get; set; }
        public bool Prime_Contract { get; set; }
        public bool Ret_Billed { get; set; }
        public bool Percent_Ret_Billed_5 { get; set; }
        public bool Certified_PR { get; set; }
        public bool SalesTax_Review { get; set; }
        public bool About_Time { get; set; }
        public bool Off_WIP { get; set; }
        public string AR_Customer { get; set; }
        public string Job_Tax_Group { get; set; }
        public string Billing_Method { get; set; }
        public string Billing_Level { get; set; }
        public string Revenue_Account { get; set; }
        public Nullable<double> Retainage_Percent { get; set; }
        public bool Exempt_from_Finance_Charge { get; set; }
        public string Finance_Charge_Type { get; set; }
        public Nullable<double> Finance_Charge_Percentage { get; set; }
        public Nullable<double> Finance_Charge_Flat_Rate { get; set; }
        public string Scope_of_Work { get; set; }
        public string Daily_Entry_Control { get; set; }
        public string Workers_Comp_Group { get; set; }
        public Nullable<double> Burden_Percent { get; set; }
        public string Work_State { get; set; }
        public string Work_Local { get; set; }
        public string Default_Revenue_Code { get; set; }
        public bool On_Hold { get; set; }
        public string Authorization { get; set; }
        public string Bank_Account { get; set; }
        public bool Produce_Lien_Waiver { get; set; }
        public Nullable<double> Lien_Waiver_Minimum { get; set; }
        public string Labor_Tax_Group { get; set; }
        public string Material_Tax_Group { get; set; }
        public string Subcontract_Tax_Group { get; set; }
        public string Equipment_Tax_Group { get; set; }
        public string Overhead_Tax_Group { get; set; }
        public string Other_Tax_Group { get; set; }
        public string Cost_Account_Group { get; set; }
        public string Cost_Account_Prefix { get; set; }
        public string Cost_Account { get; set; }
        public string Cost_of_Sales_Account { get; set; }
        public string Revenue_Account_159 { get; set; }
        public string Revenue_Recog_Method { get; set; }
        public string Customer { get; set; }
        public string Customer_Name { get; set; }
        public string Customer_Address_1 { get; set; }
        public string Customer_Address_2 { get; set; }
        public string Customer_City { get; set; }
        public string Customer_State { get; set; }
        public string Customer_ZIP_Code { get; set; }
        public string Customer_Contact_1 { get; set; }
        public string Customer_Phone_1 { get; set; }
        public string Customer_FAX { get; set; }
        public string Bill_to_Address_1 { get; set; }
        public string Bill_to_Address_2 { get; set; }
        public string Bill_to_city { get; set; }
        public string Bill_to_state { get; set; }
        public string Bill_to_ZIP_Code { get; set; }
        public string Customer_Contact_2 { get; set; }
        public string Customer_Phone_2 { get; set; }
        public string Owner_Contract_ID { get; set; }
        public Nullable<System.DateTime> Contract_Date { get; set; }
        public Nullable<double> Retainage_Percent_180 { get; set; }
        public string Contract_Type { get; set; }
        public Nullable<double> Original_Contract_Amount { get; set; }
        public Nullable<double> Potential_CO_Contract_Changes { get; set; }
        public Nullable<double> CO_Request_Contract_Changes { get; set; }
        public Nullable<double> Verbal_Okay_Contract_Changes { get; set; }
        public Nullable<double> JTD_Aprvd_Contract_Chgs { get; set; }
        public Nullable<double> Revised_Contract_Amount { get; set; }
        public Nullable<double> YTD_Aprvd_Contract_Chgs { get; set; }
        public Nullable<double> QTD_Aprvd_Contract_Chgs { get; set; }
        public Nullable<double> MTD_Aprvd_Contract_Chgs { get; set; }
        public Nullable<double> LM_Aprvd_Contract_Chgs { get; set; }
        public Nullable<double> NM_Aprvd_Contract_Chgs { get; set; }
        public Nullable<double> JTD_Work_Billed { get; set; }
        public Nullable<double> YTD_Work_Billed { get; set; }
        public Nullable<double> QTD_Work_Billed { get; set; }
        public Nullable<double> MTD_Work_Billed { get; set; }
        public Nullable<double> LM_Work_Billed { get; set; }
        public Nullable<double> NM_Work_Billed { get; set; }
        public Nullable<double> JTD_Retainage_Held { get; set; }
        public Nullable<double> YTD_Retainage_Held { get; set; }
        public Nullable<double> QTD_Retainage_Held { get; set; }
        public Nullable<double> MTD_Retainage_Held { get; set; }
        public Nullable<double> LM_Retainage_Held { get; set; }
        public Nullable<double> NM_Retainage_Held { get; set; }
        public Nullable<double> JTD_Payments { get; set; }
        public Nullable<double> YTD_Payments { get; set; }
        public Nullable<double> QTD_Payments { get; set; }
        public Nullable<double> MTD_Payments { get; set; }
        public Nullable<double> LM_Payments { get; set; }
        public Nullable<double> NM_Payments { get; set; }
        public Nullable<double> JTD_Adjustment { get; set; }
        public Nullable<double> YTD_Adjustment { get; set; }
        public Nullable<double> QTD_Adjustment { get; set; }
        public Nullable<double> MTD_Adjustment { get; set; }
        public Nullable<double> LM_Adjustment { get; set; }
        public Nullable<double> NM_Adjustment { get; set; }
        public Nullable<double> Receivable_Balance { get; set; }
        public string Last_Draw { get; set; }
        public bool Orig_Estimate_Finalized { get; set; }
        public Nullable<double> Original_Estimate { get; set; }
        public Nullable<double> Pending_Estimate_Changes { get; set; }
        public Nullable<double> JTD_Aprvd_Estimate_Chgs { get; set; }
        public Nullable<double> Total_Estimate { get; set; }
        public Nullable<double> YTD_Aprvd_Estimate_Chgs { get; set; }
        public Nullable<double> QTD_Aprvd_Estimate_Chgs { get; set; }
        public Nullable<double> MTD_Aprvd_Estimate_Chgs { get; set; }
        public Nullable<double> LM_Aprvd_Estimate_Chgs { get; set; }
        public Nullable<double> NM_Aprvd_Estimate_Chgs { get; set; }
        public Nullable<double> Original_Commitment { get; set; }
        public Nullable<double> Pending_Commitment_Changes { get; set; }
        public Nullable<double> Approved_Commitment_Changes { get; set; }
        public Nullable<double> Revised_Commitment { get; set; }
        public Nullable<double> Commitment_Invoiced { get; set; }
        public Nullable<double> JTD_Cost { get; set; }
        public Nullable<double> YTD_Cost { get; set; }
        public Nullable<double> QTD_Cost { get; set; }
        public Nullable<double> MTD_Cost { get; set; }
        public Nullable<double> LM_Cost { get; set; }
        public Nullable<double> NM_Cost { get; set; }
        public Nullable<double> WTD_Cost { get; set; }
        public Nullable<double> LW_Cost { get; set; }
        public Nullable<double> Tax_on_JTD_Cost { get; set; }
        public Nullable<double> Tax_on_YTD_Cost { get; set; }
        public Nullable<double> Tax_on_QTD_Cost { get; set; }
        public Nullable<double> Tax_on_MTD_Cost { get; set; }
        public Nullable<double> Tax_on_LM_Cost { get; set; }
        public Nullable<double> Tax_on_NM_Cost { get; set; }
        public Nullable<double> Tax_on_WTD_Cost { get; set; }
        public Nullable<double> Tax_on_LW_Cost { get; set; }
        public Nullable<double> JTD_Dollars_Paid { get; set; }
        public Nullable<double> YTD_Dollars_Paid { get; set; }
        public Nullable<double> QTD_Dollars_Paid { get; set; }
        public Nullable<double> MTD_Dollars_Paid { get; set; }
        public Nullable<double> LM_Dollars_Paid { get; set; }
        public Nullable<double> NM_Dollars_Paid { get; set; }
        public Nullable<double> WTD_Dollars_Paid { get; set; }
        public Nullable<double> LW_Dollars_Paid { get; set; }
        public Nullable<double> Tax_on_JTD_Dollars_Paid { get; set; }
        public Nullable<double> Tax_on_YTD_Dollars_Paid { get; set; }
        public Nullable<double> Tax_on_QTD_Dollars_Paid { get; set; }
        public Nullable<double> Tax_on_MTD_Dollars_Paid { get; set; }
        public Nullable<double> Tax_on_LM_Dollars_Paid { get; set; }
        public Nullable<double> Tax_on_NM_Dollars_Paid { get; set; }
        public Nullable<double> Tax_on_WTD_Dollars_Pd { get; set; }
        public Nullable<double> Tax_on_LW_Dollars_Paid { get; set; }
        public Nullable<double> Total_Tax_Amount { get; set; }
        public Nullable<double> Total_Labor_Estimate { get; set; }
        public Nullable<double> Total_Labor_Units_Est { get; set; }
        public Nullable<double> Total_Material_Estimate { get; set; }
        public Nullable<double> Total_Subcontract_Est { get; set; }
        public Nullable<double> Total_Equipment_Estimate { get; set; }
        public Nullable<double> Total_Equipment_Units_Est { get; set; }
        public Nullable<double> Total_Overhead_Estimate { get; set; }
        public Nullable<double> Total_Other_Estimate { get; set; }
        public Nullable<double> Total_Labor_Commitment { get; set; }
        public Nullable<double> Total_Material_Commitment { get; set; }
        public Nullable<double> Total_Sub_Commitment { get; set; }
        public Nullable<double> Total_Equipment_Commitment { get; set; }
        public Nullable<double> Total_Overhead_Commitment { get; set; }
        public Nullable<double> Total_Other_Commitment { get; set; }
        public Nullable<double> Commitment_Invoiced__Labor { get; set; }
        public Nullable<double> Commitment_Invoiced__Material { get; set; }
        public Nullable<double> Commitment_Invoiced__Sub { get; set; }
        public Nullable<double> Commitment_Invoiced__Equipment { get; set; }
        public Nullable<double> Commitment_Invoiced__Overhead { get; set; }
        public Nullable<double> Commitment_Invoiced__Other { get; set; }
        public Nullable<double> JTD_Labor_Cost { get; set; }
        public Nullable<double> JTD_Labor_Units { get; set; }
        public Nullable<double> JTD_Material_Cost { get; set; }
        public Nullable<double> JTD_Subcontract_Cost { get; set; }
        public Nullable<double> JTD_Equipment_Cost { get; set; }
        public Nullable<double> JTD_Equipment_Units { get; set; }
        public Nullable<double> JTD_Overhead_Cost { get; set; }
        public Nullable<double> JTD_Other_Cost { get; set; }
        public Nullable<double> MTD_Labor_Cost { get; set; }
        public Nullable<double> MTD_Labor_Units { get; set; }
        public Nullable<double> MTD_Material_Cost { get; set; }
        public Nullable<double> MTD_Subcontract_Cost { get; set; }
        public Nullable<double> MTD_Equipment_Cost { get; set; }
        public Nullable<double> MTD_Equipment_Units { get; set; }
        public Nullable<double> MTD_Overhead_Cost { get; set; }
        public Nullable<double> MTD_Other_Cost { get; set; }
        public Nullable<double> LM_Labor_Cost { get; set; }
        public Nullable<double> LM_Labor_Units { get; set; }
        public Nullable<double> LM_Material_Cost { get; set; }
        public Nullable<double> LM_Subcontract_Cost { get; set; }
        public Nullable<double> LM_Equipment_Cost { get; set; }
        public Nullable<double> LM_Equipment_Units { get; set; }
        public Nullable<double> LM_Overhead_Cost { get; set; }
        public Nullable<double> LM_Other_Cost { get; set; }
        public Nullable<double> NM_Labor_Cost { get; set; }
        public Nullable<double> NM_Labor_Units { get; set; }
        public Nullable<double> NM_Material_Cost { get; set; }
        public Nullable<double> NM_Subcontract_Cost { get; set; }
        public Nullable<double> NM_Equipment_Cost { get; set; }
        public Nullable<double> NM_Equipment_Units { get; set; }
        public Nullable<double> NM_Overhead_Cost { get; set; }
        public Nullable<double> NM_Other_Cost { get; set; }
        public Nullable<double> WTD_Labor_Cost { get; set; }
        public Nullable<double> WTD_Labor_Units { get; set; }
        public Nullable<double> WTD_Equipment_Cost { get; set; }
        public Nullable<double> WTD_Equipment_Units { get; set; }
        public Nullable<double> JTD_Labor_Dollars_Paid { get; set; }
        public Nullable<double> JTD_Material_Dollars_Paid { get; set; }
        public Nullable<double> JTD_Sub_Dollars_Paid { get; set; }
        public Nullable<double> JTD_Equipment_Dollars_Paid { get; set; }
        public Nullable<double> JTD_Overhead_Dollars_Paid { get; set; }
        public Nullable<double> JTD_Other_Dollars_Paid { get; set; }
        public Nullable<System.DateTime> Date_of_Last_Report { get; set; }
        public Nullable<double> Percent_Complete { get; set; }
        public Nullable<double> Msc_Job_Amt_1 { get; set; }
        public Nullable<double> Msc_Job_Amt_2 { get; set; }
        public Nullable<double> Msc_Job_Amt_3 { get; set; }
        public Nullable<double> Stored_Material { get; set; }
        public Nullable<double> Cost_At_Comp { get; set; }
        public Nullable<double> Cost_To_Comp { get; set; }
        public Nullable<double> Lab_Hrs_To_Comp { get; set; }
    }
}
