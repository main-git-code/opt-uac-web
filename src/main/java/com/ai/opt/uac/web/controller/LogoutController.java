package com.ai.opt.uac.web.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ai.opt.sso.client.filter.SSOClientConstants;
import com.ai.opt.sso.client.filter.SSOClientUser;
import com.ai.opt.sso.client.filter.SSOClientUtil;


@Controller
public class LogoutController {
	private static final Logger LOG = LoggerFactory.getLogger(LogoutController.class);
	@RequestMapping("/logout")
	public void logout(HttpServletRequest request,HttpServletResponse response){
		HttpSession session = request.getSession();
		SSOClientUser user = (SSOClientUser) session.getAttribute(SSOClientConstants.USER_SESSION_KEY);
		if(user!=null){
			try {
				session.removeAttribute(SSOClientConstants.USER_SESSION_KEY);
				String logOutServerUrl = SSOClientUtil.getLogOutServerUrlRuntime(request);
				String logOutBackUrl = SSOClientUtil.getLogOutBackUrlRuntime(request);
				response.sendRedirect(logOutServerUrl + "?service=" + logOutBackUrl);
				session.invalidate();
			} catch (IOException e) {
				LOG.error("用户登出失败",e);
			}
		}
	}

}
