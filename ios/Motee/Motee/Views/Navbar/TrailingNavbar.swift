//
//  TrailingNavbar.swift
//  Motee
//
//  Created by user165102 on 3/11/20.
//  Copyright © 2020 groupe3. All rights reserved.
//

import SwiftUI

struct TrailingNavbar : View {
    @Binding var currentPage : String
    @Binding var filter : String
    @Binding var showingModal : Bool

    var body: some View {
        ZStack{
            if(currentPage == "Accueil"){
                Filter(showingModal : $showingModal,filter: $filter)
            }else{
                SymbolGenerator(mySymbol: "person", myColor: "blue")
            }
        }
    }
}
