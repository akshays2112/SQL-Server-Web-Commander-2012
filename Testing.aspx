<!--
/*
* 
* Created by Akshay Srinivasan
* Copyright Akshay Srinivasan (TCS) 2012
* This is proprietary code and is not meant for use by anyone other than Akshay Srinivasan.
* 
*/
-->

<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Testing.aspx.cs" Inherits="TCS_Web_Charting_Tools.Testing" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
    <link rel="Stylesheet" href="StyleSheet.css" />
</head>
<body>
    <script language="javascript" type="text/javascript" src="Startup.js">
    </script>
    <form id="form1" runat="server">
    <div>
        <canvas id="canvas1">
            <script language="javascript" type="text/javascript">
                StartSQLServerCommander('canvas1');
            </script>
        </canvas>
    </div>
    </form>
</body>
</html>
