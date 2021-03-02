import _root_.io.gatling.core.scenario.Simulation
import ch.qos.logback.classic.{Level, LoggerContext}
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import org.slf4j.LoggerFactory

import scala.concurrent.duration._

/**
 * Performance test for the Emprendimiento entity.
 */
class EmprendimientoGatlingTest extends Simulation {

    val context: LoggerContext = LoggerFactory.getILoggerFactory.asInstanceOf[LoggerContext]
    // Log all HTTP requests
    //context.getLogger("io.gatling.http").setLevel(Level.valueOf("TRACE"))
    // Log failed HTTP requests
    //context.getLogger("io.gatling.http").setLevel(Level.valueOf("DEBUG"))

    val baseURL = Option(System.getProperty("baseURL")) getOrElse """http://localhost:8080"""

    val httpConf = http
        .baseUrl(baseURL)
        .inferHtmlResources()
        .acceptHeader("*/*")
        .acceptEncodingHeader("gzip, deflate")
        .acceptLanguageHeader("fr,fr-fr;q=0.8,en-us;q=0.5,en;q=0.3")
        .connectionHeader("keep-alive")
        .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:33.0) Gecko/20100101 Firefox/33.0")
        .silentResources // Silence all resources like css or css so they don't clutter the results

    val headers_http = Map(
        "Accept" -> """application/json"""
    )

    val headers_http_authentication = Map(
        "Content-Type" -> """application/json""",
        "Accept" -> """application/json"""
    )

    val headers_http_authenticated = Map(
        "Accept" -> """application/json""",
        "Authorization" -> "${access_token}"
    )

    val scn = scenario("Test the Emprendimiento entity")
        .exec(http("First unauthenticated request")
        .get("/api/account")
        .headers(headers_http)
        .check(status.is(401))
        ).exitHereIfFailed
        .pause(10)
        .exec(http("Authentication")
        .post("/api/authenticate")
        .headers(headers_http_authentication)
        .body(StringBody("""{"username":"admin", "password":"admin"}""")).asJson
        .check(header("Authorization").saveAs("access_token"))).exitHereIfFailed
        .pause(2)
        .exec(http("Authenticated request")
        .get("/api/account")
        .headers(headers_http_authenticated)
        .check(status.is(200)))
        .pause(10)
        .repeat(2) {
            exec(http("Get all emprendimientos")
            .get("/api/emprendimientos")
            .headers(headers_http_authenticated)
            .check(status.is(200)))
            .pause(10 seconds, 20 seconds)
            .exec(http("Create new emprendimiento")
            .post("/api/emprendimientos")
            .headers(headers_http_authenticated)
            .body(StringBody("""{
                "id":null
                , "contacto":"SAMPLE_TEXT"
                , "fechaFinObra":"2020-01-01T00:00:00.000Z"
                , "elementosDeRed":"SAMPLE_TEXT"
                , "clientesCatv":"SAMPLE_TEXT"
                , "clientesFibertel":"SAMPLE_TEXT"
                , "clientesFibertelLite":"SAMPLE_TEXT"
                , "clientesFlow":"SAMPLE_TEXT"
                , "clientesCombo":"SAMPLE_TEXT"
                , "lineasVoz":"SAMPLE_TEXT"
                , "mesesDeFinalizado":"SAMPLE_TEXT"
                , "altasBC":"SAMPLE_TEXT"
                , "penetracionVivLot":"SAMPLE_TEXT"
                , "penetracionBC":"SAMPLE_TEXT"
                , "demanda1":"SAMPLE_TEXT"
                , "demanda2":"SAMPLE_TEXT"
                , "demanda3":"SAMPLE_TEXT"
                , "demanda4":"SAMPLE_TEXT"
                , "lotes":"SAMPLE_TEXT"
                , "viviendas":"SAMPLE_TEXT"
                , "comProf":"SAMPLE_TEXT"
                , "habitaciones":"SAMPLE_TEXT"
                , "manzanas":"SAMPLE_TEXT"
                , "demanda":"SAMPLE_TEXT"
                , "fechaDeRelevamiento":"2020-01-01T00:00:00.000Z"
                , "telefono":"SAMPLE_TEXT"
                , "anoPriorizacion":"2020-01-01T00:00:00.000Z"
                , "contratoOpen":"SAMPLE_TEXT"
                , "negociacion":null
                , "estadoBC":"SAMPLE_TEXT"
                , "fecha":"2020-01-01T00:00:00.000Z"
                , "codigoDeFirma":"SAMPLE_TEXT"
                , "fechaFirma":"2020-01-01T00:00:00.000Z"
                , "observaciones":"SAMPLE_TEXT"
                , "comentario":"SAMPLE_TEXT"
                }""")).asJson
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_emprendimiento_url"))).exitHereIfFailed
            .pause(10)
            .repeat(5) {
                exec(http("Get created emprendimiento")
                .get("${new_emprendimiento_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created emprendimiento")
            .delete("${new_emprendimiento_url}")
            .headers(headers_http_authenticated))
            .pause(10)
        }

    val users = scenario("Users").exec(scn)

    setUp(
        users.inject(rampUsers(Integer.getInteger("users", 100)) during (Integer.getInteger("ramp", 1) minutes))
    ).protocols(httpConf)
}
