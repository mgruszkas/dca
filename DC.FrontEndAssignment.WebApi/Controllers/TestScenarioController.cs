using DC.FrontEndAssignment.WebApi.Data;
using Microsoft.AspNetCore.Mvc;

namespace DC.FrontEndAssignment.WebApi.Controllers
{
    [Route("api")]
    public class TestScenarioController : Controller
    {
        private readonly Repository _repository;

        public TestScenarioController(Repository repository)
        {
            _repository = repository;
        }

        [HttpGet, Route("aggregatedResult")]
        public IActionResult GetAggregatedResult()
        {
            var dto = _repository.GetAggregatedResult();

            return Ok(dto);
        }

        [HttpGet, Route("aggregatedResultByYear")]
        public IActionResult GetAggregatedResultByYear()
        {
            var dto = _repository.GetAggregatedResultByYear();

            return Ok(dto);
        }

        [HttpGet, Route("averageIndexedLTFVByYear")]
        public IActionResult GetAverageIndexedLTFVByYear()
        {
            var dto = _repository.GetAverageIndexedLTFVByYear();

            return Ok(dto);
        }

        [HttpGet, Route("averageOriginalPropertyValueByYear")]
        public IActionResult GetAverageOriginalPropertyValueByYear()
        {
            var dto = _repository.GetAverageOriginalPropertyValueByYear();

            return Ok(dto);
        }
    }
}