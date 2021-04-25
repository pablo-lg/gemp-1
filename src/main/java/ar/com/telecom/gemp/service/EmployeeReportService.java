package ar.com.telecom.gemp.service;

import ar.com.telecom.gemp.domain.Emprendimiento;
import ar.com.telecom.gemp.repository.EmprendimientoRepository;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.persistence.criteria.CriteriaBuilder.Case;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EmployeeReportService {
    @Value("${file.path-report}")
    String pathReport;

    @Autowired
    private EmprendimientoRepository emprendimientoRepository;

    public String generateReport(String export) {
        List<Emprendimiento> emprendimientos = emprendimientoRepository.findAll();
        List<Employee> empList = new ArrayList<Employee>();

        // mapear la lista de emprendimientos, con una lista del nuevo objeto employee que tiene los campos que necesita el reporte
        for (Emprendimiento emprendimiento : emprendimientos) {
            empList.add(
                new Employee(
                    emprendimiento.getId(),
                    emprendimiento.getNombre(),
                    emprendimiento.getEstado().getDescripcion(),
                    emprendimiento.getTecnologia().getDescripcion()
                )
            );
        }

        try {
            InputStream employeeReportStream = getClass().getResourceAsStream("/reports_templates/emprendimiento_detalle.jrxml");

            String templatePath = getClass().getClassLoader().getResource("reports_templates").toString();
            // String reportPath = getClass().getClassLoader().getResource("reports_finish").toString();

            // Compile the Jasper report from .jrxml to .japser
            JasperReport jasperReport = JasperCompileManager.compileReport(employeeReportStream);
            // JasperReport jasperReport = JasperCompileManager.compileReport(templatePath + "/employee-rpt.jrxml");

            // Get your data source
            JRBeanCollectionDataSource jrBeanCollectionDataSource = new JRBeanCollectionDataSource(emprendimientos);

            // Add parameters
            Map<String, Object> parameters = new HashMap<>();

            parameters.put("createdBy", "pablo");

            // Fill the report
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, jrBeanCollectionDataSource);

            // Export the report to a PDF file
            // asi lo mete en la carpeta bin del servidor
            switch (export) {
                case "pdf":
                    JasperExportManager.exportReportToPdfFile(jasperPrint, "Emprendimientos.pdf");
                    System.out.println("Done");
                    return "Report successfully generated @path= " + templatePath;
                case "html":
                    JasperExportManager.exportReportToHtmlFile(jasperPrint, "Emprendimientos.html");
                    System.out.println("Done");
                    return "Reporte generado...";
                default:
                    return "Peticion erronea, debe poner pdf o html";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }
}
