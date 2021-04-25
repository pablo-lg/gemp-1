package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.service.EmployeeReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employee")
public class EmpReportController {
    @Autowired
    private EmployeeReportService employeeReportService;

    @GetMapping("/report/{export}")
    public String empReport(@PathVariable String export) {
        return employeeReportService.generateReport(export);
    }
}
