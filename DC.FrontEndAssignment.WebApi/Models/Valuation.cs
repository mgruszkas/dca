namespace DC.FrontEndAssignment.WebApi.Models
{
    public class Valuation
    {
        public string PoolId { get; set; }
        public string LoanId { get; set; }
        public decimal CurrentForeclosureValue { get; set; }
        public decimal CurrentNetPropertyValue { get; set; }
        public decimal CurrentPropertyValue { get; set; }
        public decimal ForeclosureResidualDebtEstimate { get; set; }
        public decimal IndexedLTFV { get; set; }
        public decimal LoanLossEstimate { get; set; }
        public decimal LoanPrice { get; set; }
        public decimal OriginalForeclosureValue { get; set; }
        public decimal OriginalLTFV { get; set; }
        public decimal OriginalLTV { get; set; }
        public decimal OriginalPropertyValue { get; set; }
        public string PropertyValuationDate { get; set; }
    }
}