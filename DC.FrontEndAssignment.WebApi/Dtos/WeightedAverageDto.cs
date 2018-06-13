namespace DC.FrontEndAssignment.WebApi.Dtos
{
    public class WeightedAverageDto
    {
        public int LoanOriginationYear { get; set; }
        public decimal WAOriginalPrincipalBalance { get; set; }
        public decimal WADTI { get; set; }
        public decimal WALTI { get; set; }
        public decimal WATotalIncome { get; set; }
        public decimal WAIndexedDTI { get; set; }
        public decimal WAIndexedLTI { get; set; }
        public decimal WAIndexedTotalIncome { get; set; }
        public decimal WACurrentInterestRate { get; set; }
        public decimal WAOriginalLTV { get; set; }
        public decimal WAOriginalLTFV { get; set; }
        public decimal WAOriginalForeclosureValue { get; set; }
        public decimal WAIndexedLTFV { get; set; }
    }
}