export const mapResponseToBalances = (response) => {
  return response.map((data) => ({
    id: data?.id,
    dollars: {
      total: data?.dollars,
      forDollar: null,
      toDollar: null,
    },
    euros: {
      total: data?.euros.total,
      forDollar: data?.euros.for_dollar,
      toDollar: data?.euros.to_dollar,
    },
    pesosArgentinos: {
      total: data?.pesos_argentinos.total,
      forDollar: data?.pesos_argentinos.for_dollar,
      toDollar: data?.pesos_argentinos.to_dollar,
    },
    bolivares: {
      total: data?.bolivares.total,
      forDollar: data?.bolivares.for_dollar,
      toDollar: data?.bolivares.to_dollar,
    },
    reales: {
      total: data?.reales.total,
      forDollar: data?.reales.for_dollar,
      toDollar: data?.reales.to_dollar,
    },
    totalDollares: data?.total_dollares,
    createdAt: data?.created_at,
    updatedAt: data?.updated_at,
  }));
};
