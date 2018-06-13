using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using DC.FrontEndAssignment.WebApi.Dtos;
using DC.FrontEndAssignment.WebApi.Models;
using Newtonsoft.Json;

namespace DC.FrontEndAssignment.WebApi.Data
{
    public class Repository
    {
        private const string JsonFileName = "TestScenario.json";

        private readonly IReadOnlyList<Master> _model;

        public Repository()
        {
            _model = LoadModelFromJson();
        }

        public WeightedAverageDto GetAggregatedResult()
        {
            return new WeightedAverageDto
            {
                WAOriginalPrincipalBalance = _model.WeightedAverage(x => x.OriginalPrincipalBalance, x => x.History.CurrentPrincipalBalance),
                WACurrentInterestRate = _model.WeightedAverage(x => x.HistoryRate.CurrentInterestRate, x => x.History.CurrentPrincipalBalance),
                WATotalIncome = _model.WeightedAverage(x => x.Income.TotalIncome, x => x.History.CurrentPrincipalBalance),
                WAIndexedTotalIncome = _model.WeightedAverage(x => x.Income.IndexedTotalIncome, x => x.History.CurrentPrincipalBalance),
                WADTI = _model.WeightedAverage(x => x.Income.DTI, x => x.History.CurrentPrincipalBalance),
                WALTI = _model.WeightedAverage(x => x.Income.LTI, x => x.History.CurrentPrincipalBalance),
                WAIndexedDTI = _model.WeightedAverage(x => x.Income.IndexedDTI, x => x.History.CurrentPrincipalBalance),
                WAIndexedLTI = _model.WeightedAverage(x => x.Income.IndexedLTI, x => x.History.CurrentPrincipalBalance),
                WAIndexedLTFV = _model.WeightedAverage(x => x.Valuation.IndexedLTFV, x => x.History.CurrentPrincipalBalance),
                WAOriginalLTFV = _model.WeightedAverage(x => x.Valuation.OriginalLTFV, x => x.History.CurrentPrincipalBalance),
                WAOriginalLTV = _model.WeightedAverage(x => x.Valuation.OriginalLTV, x => x.History.CurrentPrincipalBalance),
                WAOriginalForeclosureValue = _model.WeightedAverage(x => x.Valuation.OriginalForeclosureValue, x => x.History.CurrentPrincipalBalance)
            };
        }

        public IEnumerable<WeightedAverageDto> GetAggregatedResultByYear()
        {
            return _model.OrderBy(x => x.LoanOriginationDate.Year).GroupBy(x => x.LoanOriginationDate.Year).Select(g =>
                new WeightedAverageDto
                {
                    LoanOriginationYear = g.Key,
                    WAOriginalPrincipalBalance = g.WeightedAverage(x => x.OriginalPrincipalBalance, x => x.History.CurrentPrincipalBalance),
                    WACurrentInterestRate = g.WeightedAverage(x => x.HistoryRate.CurrentInterestRate, x => x.History.CurrentPrincipalBalance),
                    WATotalIncome = g.WeightedAverage(x => x.Income.TotalIncome, x => x.History.CurrentPrincipalBalance),
                    WAIndexedTotalIncome = g.WeightedAverage(x => x.Income.IndexedTotalIncome, x => x.History.CurrentPrincipalBalance),
                    WADTI = g.WeightedAverage(x => x.Income.DTI, x => x.History.CurrentPrincipalBalance),
                    WALTI = g.WeightedAverage(x => x.Income.LTI, x => x.History.CurrentPrincipalBalance),
                    WAIndexedDTI = g.WeightedAverage(x => x.Income.IndexedDTI, x => x.History.CurrentPrincipalBalance),
                    WAIndexedLTI = g.WeightedAverage(x => x.Income.IndexedLTI, x => x.History.CurrentPrincipalBalance),
                    WAIndexedLTFV = g.WeightedAverage(x => x.Valuation.IndexedLTFV, x => x.History.CurrentPrincipalBalance),
                    WAOriginalLTFV = g.WeightedAverage(x => x.Valuation.OriginalLTFV, x => x.History.CurrentPrincipalBalance),
                    WAOriginalLTV = g.WeightedAverage(x => x.Valuation.OriginalLTV, x => x.History.CurrentPrincipalBalance),
                    WAOriginalForeclosureValue = g.WeightedAverage(x => x.Valuation.OriginalForeclosureValue, x => x.History.CurrentPrincipalBalance)
                });
        }

        public IEnumerable<IndexedLTFVDistributionDto> GetAverageIndexedLTFVByYear()
        {
            return _model.OrderBy(x => x.LoanOriginationDate.Year).GroupBy(x => x.LoanOriginationDate.Year).Select(g =>
                new IndexedLTFVDistributionDto
                {
                    LoanOriginationYear = g.Key,
                    AverageIndexedLTFV = Math.Round(g.Average(x => x.Valuation.IndexedLTFV), 2)
                });
        }

        public IEnumerable<PropertyValueDistributionDto> GetAverageOriginalPropertyValueByYear()
        {
            return _model.OrderBy(x => x.LoanOriginationDate.Year).GroupBy(x => x.LoanOriginationDate.Year).Select(g =>
                new PropertyValueDistributionDto
                {
                    LoanOriginationYear = g.Key,
                    AverageOriginalPropertyValue = Math.Round(g.Average(x => x.Valuation.OriginalPropertyValue), 2)
                });
        }

        private static List<Master> LoadModelFromJson()
        {
            var json = GetJsonContent();
            return JsonConvert.DeserializeObject<List<Master>>(json);
        }

        private static string GetJsonContent()
        {
            var executionAssembly = Assembly.GetExecutingAssembly();
            var resourceName = executionAssembly.GetManifestResourceNames()
                .FirstOrDefault(re => re.Contains(JsonFileName));

            using (var stream = executionAssembly.GetManifestResourceStream(resourceName))
            {
                using (var reader = new StreamReader(stream, Encoding.UTF8))
                {
                    return reader.ReadToEnd();
                }
            }
        }
    }

    public static class WeightedAverageExtension
    {
        public static decimal WeightedAverage<T>(this IEnumerable<T> records, Func<T, decimal> value, Func<T, decimal> weight)
        {
            var list = records.ToList();
            var weightedValueSum = list.Sum(x => value(x) * weight(x));
            var weightSum = list.Sum(weight);

            if (weightSum == 0)
            {
                throw new DivideByZeroException();
            }

            return Math.Round(weightedValueSum / weightSum, 2);
        }
    }
}