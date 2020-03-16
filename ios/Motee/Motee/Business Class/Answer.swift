//
//  Reponse.swift
//  Motee
//
//  Created by Amjad Menouer on 02/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import Combine
import Foundation

class Answer : Publication, Identifiable, Codable {
    
    private var idPublication : String = "0"
    var datePublication : Date = Date()
    @Published var contentPub : String = ""
    @Published var nbLikes : Int = 0
    @Published var anonymous : Bool = false
    @Published var owner : User
    @Published var tags : [Tag] = []

    var idProposition : Proposition
    
    var alreadyLikedBy : [User] = [] //just for the business logic, no need to put it on a database now
    
    var id : String {return idPublication}
    
    enum AnswerEncodingKeys : CodingKey {
        case _id
        case dateAnswer
        case contentAnswer
        case nbLikesAnswer
        case isAnonymous
        case ownerAnswer
        case tagAnswer
        case idProp
    }
    //Encoder
    func encode(to encoder : Encoder) throws{
        var container = encoder.container(keyedBy: AnswerEncodingKeys.self)
        try container.encode(tags, forKey: .tagAnswer)
    }
    //Decoder by require init
    //No need of a second initializer
    required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: AnswerEncodingKeys.self)
        self.idPublication = try container.decode(String.self, forKey: ._id)
        self.datePublication = try container.decode(Date.self, forKey: .dateAnswer)
        self.contentPub = try container.decode(String.self, forKey: .contentAnswer)
        self.nbLikes = try container.decode(Int.self, forKey: .nbLikesAnswer)
        self.anonymous = try container.decode(Bool.self, forKey: .isAnonymous)
        self.owner = try container.decode(User.self, forKey: .ownerAnswer)
        self.tags = try container.decode(Array.self, forKey: .tagAnswer)
        self.idProposition = try container.decode(Proposition.self, forKey: .idProp)
    }
    
    //methods
    
    func liker(userLike : User){
        self.nbLikes = self.nbLikes + 1
        self.alreadyLikedBy.append(userLike)
    }
    
    func disliker(userDislike : User){
        self.nbLikes = self.nbLikes - 1
        for i in 0..<self.alreadyLikedBy.count {
            if self.alreadyLikedBy[i].id == userDislike.id {
                self.alreadyLikedBy.remove(at: i)
            }
        }
    }
    
    func estProprietaire(utilisateur: User)->Bool{
        if utilisateur.equals(utilisateur: self.owner) {
            return true
        }else {
            return false
        }
    }
    
    func peutSupprimer(utilisateur: User) -> Bool {
        if(self.estProprietaire(utilisateur: utilisateur) || utilisateur.admin){
            return true
        }else{
            return false
        }
    }
    
    func supprimer(utilisateur: User)->Bool {
        if self.peutSupprimer(utilisateur: utilisateur){
            for it in 0..<owner.idPropositions.count {
                if owner.idPropositions[it].id == self.idPublication {
                    owner.idPropositions.remove(at: it)
                    return true //case : publication was genuinely deleted :D
                }
            }
            for it in 0..<owner.idAnswers.count {
                if owner.idAnswers[it].id == self.idPublication {
                    owner.idAnswers.remove(at: it)
                    return true //case : publication was genuinely deleted :D
                }
            }
            return false //case : nothing was deleted
        } else {
            return false //case : cannot delete the publication
        }
    }
    
    func revelerIdentitePublication(utilisateur : User)->User?{
        if utilisateur.admin && self.anonymous {
            return self.owner
        } else {
            return nil
        }
    }
    
    func estLikee(utilisateur: User)->Bool{
        var isLiked : Bool = false
        for it in 0..<alreadyLikedBy.count {
            if alreadyLikedBy[it].equals(utilisateur: utilisateur){
                isLiked = true
            }
        }
        return isLiked
    }
}
