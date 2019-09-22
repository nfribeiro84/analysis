using CsvAnalysisAPI.Models.Knowledge;
using CsvAnalysisAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CsvAnalysisAPI.Controllers
{
    [RoutePrefix("knowledge")]
    public class KnowledgeController : ApiController
    {
        private KnowledgeRepository repository;

        public KnowledgeController()
        {
            this.repository = new KnowledgeRepository();
        }

        [Route("hierarquias")]
        [HttpGet]
        public IEnumerable<Hierarquia> GetHierarquias()
        {
            return repository.GetHierarquias();
        }

        [Route("hierarquia/{hierarquiasTerritoriaisId:int}")]
        [HttpGet]
        public IEnumerable<UnidadeDivisao> GetHierarquiaLevel([FromUri]int hierarquiasTerritoriaisId, [FromUri]int? parentId = null)
        {
            return repository.GetHierarquiaLevel(hierarquiasTerritoriaisId, parentId);
        }
    }
}
