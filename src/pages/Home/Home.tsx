import { useQuery } from "@tanstack/react-query"
import { flightApi } from "src/apis/flight.api"
import useQueryConfig from "src/hooks/useQueryConfig"
import { FlightOfferParamsConfig } from "src/types/flight.type"

export default function Home() {
  const queryConfig = useQueryConfig()

  const getFlightOffersQuery = useQuery({
    queryKey: ["flightOffers", queryConfig],
    queryFn: () => {
      return flightApi.flightOffers(queryConfig as FlightOfferParamsConfig)
    }
  })

  console.log(getFlightOffersQuery.data?.data)

  return (
    <div className="h-[1000px]">
      <div className="container">home</div>
    </div>
  )
}
