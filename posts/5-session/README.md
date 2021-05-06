# session

```bash
app.use((req,res,next)=>{
    if(req.session.loged) {
        next();
    } else {
        res.redirect("/login");
    }
});
```