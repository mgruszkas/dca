namespace DC.FrontEndAssignment.WebApi.Models
{
    public class HistoryRate
    {
        public string LoanId { get; set; }
        public decimal CurrentInterestRate { get; set; }
        public string LoanReportDate { get; set; }
    }
}