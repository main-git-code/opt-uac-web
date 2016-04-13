<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%
    String _base = request.getContextPath();
    request.setAttribute("_base", _base);
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", 0);
    response.setHeader("Pragma", "No-cache");
    
    String _baasBase=_base+"/theme/baas";
    request.setAttribute("_baasBase", _baasBase);
%>
<script>
    var _base = "${_base}";
</script>
<script src="${_base}/resources/spm_modules/jquery/1.9.1/jquery.js"></script>
<script src="${_base}/resources/spm_modules/bootstrap/dist/js/bootstrap.js"></script>
<script src="${_base}/resources/spm_modules/seajs/2.3.0/dist/sea.js"></script>
<script src="${_base}/resources/spm_modules/seajs/seajs-css.js"></script>
<script src="${_base}/resources/spm_modules/app/core/config.js"></script>

<!-- UED style begin -->
 <link href="${_base}/theme/baas/css/bootstrap.css" rel="stylesheet" type="text/css">
 <link href="${_base}/theme/baas/css/font-awesome.css" rel="stylesheet" type="text/css">
 <link href="${_base}/theme/baas/css/frame.css" rel="stylesheet" type="text/css">
 <link href="${_base}/theme/baas/css/global.css" rel="stylesheet" type="text/css">
 <link href="${_base}/theme/baas/css/modular.css" rel="stylesheet" type="text/css">
 <link href="${_base}/theme/baas/css/login-regsiter.css" rel="stylesheet" type="text/css"> 
 <script type="text/javascript" src="${_base}/theme/baas/js/jquery-1.11.1.min.js" ></script>
 <script type="text/javascript" src="${_base}/theme/baas/js/bootstrap.js" ></script>
 <script type="text/javascript" src="${_base}/theme/baas/js/frame.js" ></script>
 <script type="text/javascript" src="${_base}/theme/baas/js/comp.js" ></script>
<!-- UED style end -->


<!-- opt-uac -->
<link href="${_base}/theme/baas/css/opt-uac.css" rel="stylesheet" type="text/css">
