using CsvAnalysisAPI.Models.Knowledge;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CsvAnalysisAPI.Repositories
{
    public class KnowledgeRepository
    {
        PetaPoco.Database kdb = new PetaPoco.Database("kdb");
        public KnowledgeRepository()
        {

        }

        public IEnumerable<Hierarquia> GetHierarquias()
        {
            PetaPoco.Sql query = PetaPoco.Sql.Builder;
            query.Append(@" select ht.HierarquiasTerritoriaisId 'HierarquiasId', n.Nome, ht.Descricao 
                            from HierarquiasTerritoriais ht inner join Nomes n on ht.NomesId = n.NomesId");
            return kdb.Query<Hierarquia>(query);
        }

        public IEnumerable<UnidadeDivisao> GetHierarquiaLevel(int hierarquiaId, int? parentId)
        {
            PetaPoco.Sql query = PetaPoco.Sql.Builder;
            query.Append(@" select udh.UnidadesDivisoesHierarquiasId, nu.Nome 'Unidade', nd.Nome 'Divisao', udh.UnidadesDivisoesId, udh.HierarquiasTerritoriaisId,
	                        (select COUNT(*) from Unidades_Divisoes_Hierarquias udh2 where udh2.HierarquiasTerritoriaisId = udh.HierarquiasTerritoriaisId and ParentId = udh.UnidadesDivisoesId) 'Children',
                            ( select na.Nome from Nomes na inner join UT_NomesAlternativos utna on na.NomesId = utna.NomesId where utna.UnidadesTerritoriaisId = ut.UnidadesTerritoriaisId for JSON Path ) 'Alternativos'
                            from 
	                            Unidades_Divisoes_Hierarquias udh
	                            inner join Unidades_Divisoes ud on udh.UnidadesDivisoesId = ud.UnidadesDivisoesId
	                            inner join UnidadesTerritoriais ut on ud.UnidadesTerritoriaisId = ut.UnidadesTerritoriaisId
	                            inner join DivisoesTerritoriais dt on ud.DivisoesTerritoriaisId = dt.DivisoesTerritoriaisId
	                            inner join Nomes nu on ut.NomesId = nu.NomesId
	                            inner join Nomes nd on dt.NomesId = nd.nomesId
                            where 
                                udh.HierarquiasTerritoriaisId = @0 and ", hierarquiaId);
            if (parentId.HasValue)
                query.Append("udh.ParentId = @0", parentId.Value);
            else
                query.Append("udh.ParentId is null");

            return kdb.Query<UnidadeDivisao>(query);
        }
    }
}