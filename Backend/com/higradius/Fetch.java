package com.higradius;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.higradius.Pojo;
import com.google.gson.Gson;

/**
 * Servlet implementation class Fetch
 */
@WebServlet("/Fetch")
public class Fetch extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
	private Gson gson = new Gson();
	
	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/h2h_internship?zeroDateTimeBehavior=convertToNull";
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Fetch() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@SuppressWarnings("null")
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		String USER = "root";
	    String PASS = "root";

	    Connection conn = null;
	    PreparedStatement ps = null;
	    
	    int startParameter = 1, pageCount=1;
	    int limitParameter = 10;
	    pageCount = Integer.parseInt(request.getParameter("page"));
	    startParameter = pageCount * limitParameter - limitParameter;
	    
	     try {
	    	//Register JDBC driver
	    	 Class.forName(JDBC_DRIVER);
	    	 
	    	//Open a connection
	    	 conn = DriverManager.getConnection(DB_URL, USER, PASS);
		     
		   //Execute a query
	    	
	    	 
	    	 String sql =  "select name_customer, cust_number, invoice_id, total_open_amount, due_in_date, notes from invoice_details LIMIT ?, ?;";
	    	
				
	    	 ps = conn.prepareStatement(sql);

	    	 ArrayList<Pojo> list = new ArrayList<>();
	    	 ps.setInt(1, startParameter);
	    	 ps.setInt(2, limitParameter);
	    	 ResultSet rs = ps.executeQuery();  
	            while(rs.next()){  
	                Pojo object = new Pojo();
	                object.setname_customer(rs.getString("name_customer"));  
	                object.setcust_number(rs.getString("cust_number"));  
	                object.setinvoice_id(rs.getString("invoice_id"));  
	                object.settotal_open_amount(rs.getDouble("total_open_amount"));  
	                object.setdue_in_date(rs.getDate("due_in_date"));
	                object.setNotes(rs.getString("notes"));
	                list.add(object);  
	                
	            } 
	           
				
	                String invoiceJsonString = this.gson.toJson(list);
	    	        PrintWriter out = response.getWriter();
	    	        response.setContentType("application/json");
	    	        response.setCharacterEncoding("UTF-8");
	    	        out.print(invoiceJsonString);
	    	        out.flush();
	    	      
	            rs.close();
	            ps.close();
	            conn.close();  
	     }
	     catch(Exception e) {
		    	//Handle errors for IO
		    	 e.printStackTrace();
	     }
	       	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
