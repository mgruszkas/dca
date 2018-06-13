using System;

namespace DC.FrontEndAssignment.WebApi.Models
{
    public class Master
    {
        public string PoolId { get; set; }
        public string LoanId { get; set; }
        public string ClassType { get; set; }
        public int Guarantee { get; set; }
        public DateTime LoanOriginationDate { get; set; }
        public int LoanTypeIndicator { get; set; }
        public string BorrowerId { get; set; }
        public string MaturityDate { get; set; }
        public decimal OriginalPrincipalBalance { get; set; }
        public string Sector { get; set; }
        public int TermToMaturity { get; set; }
        public Income Income { get; set; }
        public Valuation Valuation { get; set; }
        public History History { get; set; }
        public HistoryRate HistoryRate { get; set; }
    }
}