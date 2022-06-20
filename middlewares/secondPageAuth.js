module.exports = function(req, res, next)
{
  if(req.session.secondPageAuth)
  {

    next();
      
  }
  else
  {
    res.redirect("/login")
  }

}