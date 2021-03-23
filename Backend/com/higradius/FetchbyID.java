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

import com.google.gson.Gson;

/**
 * Servlet implementation class FetchbyID
 */
@WebServlet("/FetchbyID")
public class FetchbyID extends HttpServlet {
private static final long serialVersionUID = 1L;
	
	private Gson gson = new Gson();
	
	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/h2h_internship?zeroDateTimeBehavior=convertToNull";
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FetchbyID() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		String USER = "root";
	    String PASS = "root";

	     Connection conn = null;
	     
	     try {
	    	//Register JDBC driver
	    	 Class.forName(JDBC_DRIVER);
	    	 
	    	//Open a connection
	    	 conn = DriverManager.getConnection(DB_URL, USER, PASS);
	    	 String invoice_id = request.getParameter("invoice_id");
		   //Execute a query
	    	 String sql = "SELECT name_customer, cust_number, invoice_id, total_open_amount, due_in_date, notes FROM  invoice_details WHERE invoice_id='"+invoice_id+"'";
	    	 PreparedStatement ps = conn.prepareStatement(sql);
	    	 ResultSet rs = ps.executeQuery();  
	    	 ArrayList<Pojo> list = new ArrayList<>();
	    	   
	            while(rs.next()){  
	                Pojo object = new Pojo();
	                object.setname_customer(rs.getString("name_customer"));  
	                object.setcust_number(rs.getString("cust_number"));  
	                object.setinvoice_id(rs.getString("invoice_id"));  
	                object.settotal_open_amount(rs.getDouble("total_open_amount"));  
	                object.setdue_in_date(rs.getDate("due_in_date"));
	                object.setNotes(rs.getString("notes"));
	                list.add(object);  
	                
	                String userJsonString = this.gson.toJson(object);

	    	        PrintWriter out = response.getWriter();
	    	        response.setContentType("application/json");
	    	        response.setCharacterEncoding("UTF-8");
	    	        out.print(userJsonString);
	    	        out.flush();
	            }
	            rs.close();
	            //stmt.close();
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