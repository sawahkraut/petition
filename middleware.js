function requireNoSignature(req, res, next) {
    if (req.session.signatureId) {
        res.redirect("/signed");
    } else {
        next();
    }
}
