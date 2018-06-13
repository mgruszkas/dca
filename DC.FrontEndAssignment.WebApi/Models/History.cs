namespace DC.FrontEndAssignment.WebApi.Models
{
    public class History
    {
        public string LoanId { get; set; }
        public decimal CurrentPrincipalBalance { get; set; }
        public string LoanReportDate { get; set; }
    }
}