//
//  Tag.swift
//  Motee
//
//  Created by Amjad Menouer on 26/02/2020.
//  Copyright © 2020 Amjad Menouer. All rights reserved.
//
import Combine
import Foundation

class Tag : Identifiable, ObservableObject {
    @Published var label : String
    @Published var nbOccurences : Int = 0
    
    var id : String {return self.label}
    
    private var publications : [Publication] = []
    
    init(label : String) {
        self.label = label
    }
    
    func nbOccurence(labelTag : String){
        //Get all the tag with label = labelTag
        //if tag is attached to publication => +1
        
        //var nbOccurencesTag : Int = 0
        //boucle for => JSON
    }
    
    func equals(otherTag : Tag)->Bool{
        return self.label == otherTag.label
    }
}
