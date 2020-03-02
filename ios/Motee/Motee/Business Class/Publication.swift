//
//  Publication.swift
//  Motee
//
//  Created by Amjad Menouer on 02/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import Combine
import Foundation

class Publication : Identifiable, ObservableObject {
    var idPublication : Int
    @Published var contentPub : String
    @Published var nbLikes : Int = 0
    @Published var anonymous : Bool
    
    @Published var tags : [Tag]
    @Published var owner : Utilisateur
    
    var alreadyLikedBy : [Utilisateur] = []
    
    var id : Int {return idPublication}
    
    init(user : Utilisateur, identifier : Int, content : String, anonymous : Bool, tags : [Tag]) {
        self.owner = user
        self.idPublication = identifier
        self.contentPub = content
        self.anonymous = anonymous
        self.tags = tags
    }
    
    func liker(userLike : Utilisateur){
        self.nbLikes = self.nbLikes + 1
        self.alreadyLikedBy.append(userLike)
    }
    
    func disliker(userDislike : Utilisateur){
        self.nbLikes = self.nbLikes - 1
        for i in 0..<self.alreadyLikedBy.count {
            if self.alreadyLikedBy[i].id == userDislike.id {
                self.alreadyLikedBy.remove(at: i)
            }
        }
    }
    
    func estProprietaire(utilisateur: Utilisateur)->Bool{
        if utilisateur.equals(utilisateur: self.owner) {
            return true
        }else {
            return false
        }
    }
    
    func peutSupprimer(utilisateur: Utilisateur) -> Bool {
        if(self.estProprietaire(utilisateur: utilisateur) || utilisateur.admin){
            return true
        }else{
            return false
        }
    }
    
    func supprimer(utilisateur: Utilisateur)->Bool {
        if self.peutSupprimer(utilisateur: utilisateur){
            for it in 0..<owner.publications.count {
                if owner.publications[it].id == self.idPublication {
                    owner.publications.remove(at: it)
                    return true //case : publication was genuinely deleted :D
                }
            }
            return false //case : nothing was deleted
        } else {
            return false //case : cannot delete the publication
        }
    }
    
    func revelerIdentitePublication(utilisateur : Utilisateur)->Utilisateur?{
        if utilisateur.admin && self.anonymous {
            return self.owner
        } else {
            return nil
        }
    }
    
    func estLikee(utilisateur: Utilisateur)->Bool{
        var isLiked : Bool = false
        for it in 0..<alreadyLikedBy.count {
            if alreadyLikedBy[it].equals(utilisateur: utilisateur){
                isLiked = true
            }
        }
        return isLiked
    }
}
