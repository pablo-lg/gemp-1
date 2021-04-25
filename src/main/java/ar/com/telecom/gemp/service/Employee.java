package ar.com.telecom.gemp.service;

public class Employee {
    // Generate Getters and Setters...
    private Long id;
    private String nombre;
    private String estado;
    private String tecnologia;

    public Employee(Long id, String nombre, String estado, String tecnologia) {
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;
        this.tecnologia = tecnologia;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEstado() {
        return this.estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getTecnologia() {
        return this.tecnologia;
    }

    public void setTecnologia(String tecnologia) {
        this.tecnologia = tecnologia;
    }
}
