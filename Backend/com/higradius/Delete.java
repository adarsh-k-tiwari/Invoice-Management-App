package com.higradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Delete
 */
@WebServlet("/Delete")
public class Delete extends HttpServlet {
		
	private static final long serialVersionUID = 1L;
	
	
	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/h2h_internship?zeroDateTimeBehavior=convertToNull";
    
       
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Delete() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String USER = "root";
	    String PASS = "root";
	     
	     @SuppressWarnings("unused")
	     PreparedStatement stmt = null;
	     Connection conn = null;
	     
	     try {
	    	//Register JDBC driver
	    	 Class.forName(JDBC_DRIVER);
	    	 
	    	 String invoice_id = request.getParameter("invoice_id");
	    	 
	    	//Open a connection
	    	 conn = DriverManager.getConnection(DB_URL, USER, PASS);
	    	 
	    	 String sql = "DELETE FROM invoice_details WHERE invoice_id=?";
	    	 PreparedStatement ps = conn.prepareStatement(sql);
	    	 	ps.setString(1,invoice_id);  
	            ps.executeUpdate();  
	    	 
	    		conn.close();  
	     }
	     catch(Exception e) {
	    	 e.printStackTrace();
	     }	
	}

}

