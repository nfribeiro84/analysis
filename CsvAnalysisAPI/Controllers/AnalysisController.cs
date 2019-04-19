using CsvAnalysisAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CsvAnalysisAPI.Controllers
{
    [RoutePrefix("analysis")]
    public class AnalysisController : ApiController
    {
        private AnalysisRepository repository;

        public AnalysisController()
        {
            this.repository = new AnalysisRepository();
        }

        [HttpGet]
        [Route("begin")]
        public HttpResponseMessage InitAnalysis()
        {
            return Request.CreateResponse(HttpStatusCode.OK, repository.InitAnalysis());
        }
    }
}
