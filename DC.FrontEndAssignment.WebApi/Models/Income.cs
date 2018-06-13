namespace DC.FrontEndAssignment.WebApi.Models
{
    public class Income
    {
        public string PoolId { get; set; }
        public string LoanId { get; set; }
        public string BorrowerBirthDate { get; set; }
        public decimal BorrowerTotalIncome { get; set; }
        public decimal CurrentInterestShock { get; set; }
        public decimal DTI { get; set; }
        public decimal LTI { get; set; }
        public string EmploymentStatus { get; set; }
        public decimal IndexedDTI { get; set; }
        public decimal IndexedLTI { get; set; }
        public decimal IndexedTotalIncome { get; set; }
        public decimal LivingExpenses { get; set; }
        public decimal MaxBorrowerIncome { get; set; }
        public decimal MonthlyIncomeBuffer { get; set; }
        public decimal MonthlyMortgageInterest { get; set; }
        public decimal MonthlyMortgagePrincipal { get; set; }
        public decimal MonthlyNetIncome { get; set; }
        public string SelfCertification { get; set; }
        public decimal TotalIncome { get; set; }
    }
}